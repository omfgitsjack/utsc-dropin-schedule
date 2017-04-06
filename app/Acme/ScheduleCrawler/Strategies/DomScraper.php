<?php namespace Acme\Schedule\Strategies;

// Inhouse dependencies
use Acme\Schedule\Interfaces\IDomScraper;

// Third party dependencies
use Illuminate\Support\Collection;


/**
 * Goutte-powered Dom Scraper strategies
 */
class DomScraper implements IDomScraper
{

	function __construct() {
	}

	/**
	 * Scrapes all activity sessions in crawl object
	 * @param  Crawler $crawlerObj Crawler object
	 * @return array
	 */
	public function scrapeActivitySessions($crawlerObj)
	{
		$activitySessions = $this->getActivitySessionsForOneMonth($crawlerObj);

		return $activitySessions;
	}

	/**
	 * Scrapes all activity sessions in crawl object
	 * @param  array $activitySessions Array of this month's activity sessions
	 * @return array
	 */
	public function scrapeUniqueActivities($activitySessions)
	{
		$uniqueActivities = new Collection();

		foreach ($activitySessions as $day)	
		{
			foreach ($day['activity_sessions'] as $activitySession)
			{
				$session = [
					'activity' => $activitySession['activity'],
					'women_only' => $activitySession['women_only'],
					'category' => $activitySession['category']
				];

				if (!$uniqueActivities->contains($session))
				{
					$uniqueActivities->push($session);
				}	
			}
		}

		return $uniqueActivities->toArray();
	}

	/// HELPER FUNCTIONS
	/// ------------------------------------------------------------------------

	/**
	 * Gets all activity sessions for one month
	 * @param  Crawler $crawlerObj Crawler object of UTSC Schedule
	 * @return array             Array of activity sessions with day meta data
	 */
	private function getActivitySessionsForOneMonth($crawlerObj)
	{
		// Iterate through every day that's non-empty in current month
		// document.querySelectorAll('...') to test
		$days = $crawlerObj->filter('
			td.single-day.past:not(.empty):not(.no-entry), 
			td.single-day.future:not(.empty):not(.no-entry), 
			td.single-day.today:not(.empty):not(.no-entry)')->each(function($curDay) {

			// Setup empty object to hold session values
			$day = [
				'date' => $curDay->attr('data-date'),
				'day_of_week' => $curDay->attr('headers'),
				'activity_sessions' => $this->getActivitySessionsForOneDay($curDay)
			];

			return $day;
		});

		return $days;
	}

	/**
	 * Gets all activity sessions for one day
	 * @param  Crawler $singleDay Crawler object of one day in UTSC Schedule
	 * @return array              Array of Activity Sessions
	 */
	private function getActivitySessionsForOneDay($singleDay)
	{
		$masterActivitySessions = new Collection();

		$activitySessionsList = $singleDay->filter('.item')->filter('.field-content')->
		each(function($activitySession) {

			return $this->getActivitySessionFields($activitySession);
		});

		foreach ($activitySessionsList as $activitySession)
		{
			$masterActivitySessions = $masterActivitySessions->merge($activitySession);
		}

		return $masterActivitySessions;
	}

	/**
	 * Gets activity session fields for one activity session
	 * @param  Crawler $activitySession Crawler object for one activity session
	 * @return array                    Array of activity sessions
	 */
	private function getActivitySessionFields($activitySession)
	{
		// Get fields
		$fields = $activitySession->filter('.sched-term-4')->filter('.views-field')->each(function($item, $i) {
			
			// Horrible way of retrieving content, cannot be helped because 
			// location class tag has a trailing ']'
			switch ($i)
			{
				// Activity
				case 0:
					return trim($item->text());
				// Date time
				case 1:
					$times = $item->filter('.date-display-single')->filter('span')->each(function($date) {
						return $date->attr('content');
					});
					return $times;
				// Junk
				case 2:
					return;
				// Location
				case 3:
					return trim($item->text());
				// Category
				case 4:
					return trim($item->text());
			}
		});

		// Detect if there are multiple activities in one session
		$sessions = new Collection();

		if (count($fields) > 0) { // There may not be drop-in sessions!
			$activities = $this->parseActivities($fields[0], $fields[4]);
			
			foreach ($activities as $activity)
			{
				$formattedFields = [
					'activity'   => $activity['activity'],
					'start_time' => (new \DateTime($fields[1][1]))->format('Y-m-d H:i:s'),
					'end_time'   => (new \DateTime($fields[1][2]))->format('Y-m-d H:i:s'),
					'location'   => $fields[3],
					'category'   => $fields[4],
					'women_only' => $activity['women_only']
				];
				$sessions->push($formattedFields);
			}
		}

		return $sessions;
	}

	private function parseActivities($activityTitle, $category)
	{
		$parsedActivities = new Collection();

		// Check if it's a session with two sports i.e. Badminton/Table Tennis
		if (strpos($activityTitle, "/") !== false) {
		    $activities = explode("/", $activityTitle);
		} else if (strpos($activityTitle, "&")) {
		    $activities = explode("&", $activityTitle);
		} else {
		    $activities = [$activityTitle];
		}
		
		foreach ($activities as $activity)
		{
			$formatted_activity = [];
			
			$formatted_activity['activity'] = trim($this->stripWristband($this->stripWomen($activity), " "));
			$formatted_activity['category'] = $category;
			$formatted_activity['women_only'] = $this->isWomenOnlyActivity($activity);
			$formatted_activity['wristband_needed'] = $this->requiresWristband($activity);

			$parsedActivities->push($formatted_activity);
		}
		return $parsedActivities;
	}
	
	private function requiresWristband($activityTitle)
	{
		return str_contains($activityTitle, '(Wristband Required)');	
	}

	private function isWomenOnlyActivity($activityTitle)
	{
		return str_contains($activityTitle, 'Women');
	}
	
	private function stripWristband($activityTitle)
	{
		if (ends_with(trim($activityTitle, " "), "(Wristband Required)")) {
			return trim(explode(" (Wristband Required)", trim($activityTitle, " "))[0]);
		} else {
			return $activityTitle;
		}
	}

	private function stripWomen($activityTitle)
	{
		if (starts_with($activityTitle, "Women's Only"))
		{
			return trim(explode("Women's Only", $activityTitle)[1]);
		}
		elseif (ends_with($activityTitle, "Women Only"))
		{
			return trim(explode(" - Women Only", $activityTitle)[0]);
		}
		else
		{
			return $activityTitle;
		}
	}

}


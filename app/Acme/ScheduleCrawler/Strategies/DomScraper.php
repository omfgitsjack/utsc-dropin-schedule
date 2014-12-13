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
		$activities = new Collection();

		foreach ($activitySessions as $day)	
		{
			foreach ($day['activity_sessions'] as $activitySession)
			{
				$activity = 
				[
					'activity' => $activitySession['activity'],
					'category' => $activitySession['category']
				];

				if (!$activities->contains($activity))
				{
					$activities->push($activity);
				}
			}
		}

		return $activities;
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
		// Iterate through every day in current month
		$days = $crawlerObj->filter('td.single-day')->each(function($curDay) {

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
		$activitySessions = $singleDay->filter('.item')->filter('.field-content')->
		each(function($activitySession) {

			return $this->getActivitySessionFields($activitySession);
		});

		return $activitySessions;
	}

	/**
	 * Gets activity session fields for one activity session
	 * @param  Crawler $activitySession Crawler object for one activity session
	 * @return object                   JSON object of activity session's activity, start&end time, location and category
	 */
	private function getActivitySessionFields($activitySession)
	{
		$fields = $activitySession->filter('.views-field')->each(function($item, $i) {
			
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

		$formattedFields = [
			'activity'   => $fields[0],
			'start_time' => (new \DateTime($fields[1][1]))->format('Y-m-d H:i:s'),
			'end_time'   => (new \DateTime($fields[1][2]))->format('Y-m-d H:i:s'),
			'location'   => $fields[3],
			'category'   => $fields[4]
		];

		return $formattedFields;
	}

}


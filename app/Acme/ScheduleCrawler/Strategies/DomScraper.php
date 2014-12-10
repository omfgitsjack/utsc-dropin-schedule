<?php namespace Acme\ScheduleCrawler\Strategies;

use Acme\ScheduleCrawler\Interfaces\IDomScraper;


/**
 * Goutte-powered Dom Scraper strategies
 */
class DomScraper implements IDomScraper
{

	function __construct() {}

	/**
	 * Scrapes all activity sessions in crawl object
	 * @param  CrawlObj $crawlObj Crawler object
	 * @return array
	 */
	public function scrapeActivitySessions($crawlObj)
	{
		return $this->getActivitySessionsForOneMonth($crawlObj);
	}

	/**
	 * Scrapes all activity sessions in crawl object
	 * @param  CrawlObj $crawlObj Crawler Object
	 * @return array
	 */
	public function scrapeUniqueActivities($crawlObj)
	{

	}

	/**
	 * Gets all activity sessions for one month
	 * @param  Crawler $crawlObj Crawler object of UTSC Schedule
	 * @return array             Array of activity sessions with day meta data
	 */
	private function getActivitySessionsForOneMonth($crawlObj)
	{
		// Iterate through every day in current month
		$days = $crawlObj->filter('td.single-day')->each(function($curDay) {

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
			'start_time' => new \DateTime($fields[1][1]),
			'end_time'   => new \DateTime($fields[1][2]),
			'location'   => $fields[3],
			'category'   => $fields[4]
		];

		return $formattedFields;
	}

}


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
		// Filter by days of the month
		$days = $crawlObj->filter('td.single-day')->each(function($node, $i) {

			// Setup empty object to hold session values
			$day = [];

			// Assign date & day of week
			$day['date'] = $node->attr('data-date');
			$day['day_of_week'] = $node->attr('headers');

			// Retrieve activity sessions in day
			$day['activity_sessions'] = $node->filter('.item')->
			filter('.field-content')->each(function($item, $i) {

				$session = [];

				$fields = $item->filter('.views-field')->each(function($item, $i) {
	
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

				$session = 
				[
					'activity'   => $fields[0],
					'start_time' => $fields[1][1],
					'end_time'   => $fields[1][2],
					'location'   => $fields[3],
					'category'   => $fields[4]
				];

				return $session;

			});

			return $day;
		});

		return $days;
	}

	/**
	 * Scrapes all activity sessions in crawl object
	 * @param  CrawlObj $crawlObj Crawler Object
	 * @return array
	 */
	public function scrapeUniqueActivities($crawlObj)
	{

	}

	private function getScheduleBody($crawlObj)
	{
		return $crawlObj->filter('tbody');
	}

	private function getSessionText($crawler, $filter)
	{
		$textArray = $this->getRawSessionTextArray($crawler, $filter);
		// textArray should only contain one item.
		$text = $textArray[0];
		// strip trailing white spaces
		$text = trim($text);

		return $text;
	}

	private function getRawSessionTextArray($crawler, $filter)
	{
		return $crawler->filter($filter)->each(function($session, $i) {		
			dd($session->text());
			return $session->text();
		});
	}

}


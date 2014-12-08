<?php namespace Acme\ScheduleCrawler\Strategies;

use Acme\ScheduleCrawler\Interfaces\IDomCrawler;
use Acme\ScheduleCrawler\Interfaces\IDomScraper;
use Goutte\Client;


/**
 * Goutte powered Dom Crawler
 */
class DomCrawler implements IDomCrawler
{

	protected $domScraper;
	protected $client;

	/**
	 * Crawler utilizes DomCrawler
	 * @param DomScraper $domScrapper DomScraper object
	 * @param Client     $client      Goutte Web Crawler     
	 */
	function __construct(IDomScraper $domScraper, Client $client)
	{
		$this->domScraper = $domScraper;
		$this->client = $client;
	}

	/**
	 * Retrieves CrawlObj for a given url
	 * @param  string $url Url we're crawling for
	 * @return CrawlObj      Crawler Object
	 */
	public function getCrawlObj($url)
	{
		return $this->client->request('GET', $url);
	}

	/**
	 * Scrapes unique activities from a crawler object
	 * @param  CrawlerObj $crawlerObj Crawler Object
	 * @return array                  Array of unique activities
	 */
	public function scrapeUniqueActivities($crawlerObj)
	{
		return $this->domScraper->scrapeActivitySessions('crawlerObj');
	}

	/**
	 * Stores all activities into database
	 * @param  array $activityList List of Activity objects
	 * @return void
	 */
	public function storeActivities($activityList)
	{

	}

	/**
	 * Scrapes activity sessions from a crawler object.
	 * @param  CrawlerObj $crawlerObj Crawler Object
	 * @return array
	 */
	public function scrapeActivitySessions($crawlerObj)
	{
		return $this->domScraper->scrapeActivitySessions($crawlerObj);
	}

	/**
	 * Stores all activity sessions into database
	 * @param  array $sessions List of activity sessions
	 * @return void
	 */
	public function storeActivitySessions($sessions)
	{

	}

}


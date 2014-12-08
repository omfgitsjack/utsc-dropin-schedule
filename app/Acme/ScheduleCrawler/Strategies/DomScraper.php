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
	 * @return void
	 */
	public function scrapeActivitySessions($crawlObj)
	{

	}

	/**
	 * Scrapes all activity sessions in crawl object
	 * @param  CrawlObj $crawlObj Crawler Object
	 * @return void
	 */
	public function scrapeUniqueActivities($crawlObj)
	{

	}

}


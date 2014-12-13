<?php namespace Acme\ScheduleCrawler\Interfaces;


/**
 * Strategies for scraping the DOM
 */
Interface IDomScraper {

	// Scrapes Activity Sessions from html
	public function scrapeActivitySessions($crawlerObj);

	// Scrapes Unique Activities from scraped Activity Sessions
	public function scrapeUniqueActivities($activitySessions);

}
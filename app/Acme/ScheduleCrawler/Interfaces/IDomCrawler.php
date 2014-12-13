<?php namespace Acme\ScheduleCrawler\Interfaces;


/**
 * Crawls through DOM of a URL & stores Activities and their sessions
 */
Interface IDomCrawler {

	// Get Crawler Object for a specific URL
	public function getCrawlerObj($url);

	// Scrape Activities
	public function scrapeActivities($crawlerObj);

	// Scrape Activity Sessions
	public function scrapeActivitySessions($crawlerObj);

	// Store Activities that have been scraped
	public function storeActivities($activities);

	// Store Activity Sessions that have been scraped
	public function storeActivitySessions($activitySessions);

}
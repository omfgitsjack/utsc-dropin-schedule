<?php namespace Acme\ScheduleCrawler\Interfaces;


/**
 * Strategies for scraping the DOM
 */
Interface IDomScraper {

	public function scrapeActivitySessions($crawlObj);

	public function scrapeUniqueActivities($crawlObj);

}
<?php namespace Acme\ScheduleCrawler\Interfaces;


/**
 * Crawls through DOM of a URL & stores Activities and their sessions
 */
Interface IDomCrawler {

	public function getCrawlObj($url);

	public function scrapeUniqueActivities($crawlerObj);

	public function storeActivities($activityList);

	public function scrapeActivitySessions($crawlerObj);

	public function storeActivitySessions($sessions);

}
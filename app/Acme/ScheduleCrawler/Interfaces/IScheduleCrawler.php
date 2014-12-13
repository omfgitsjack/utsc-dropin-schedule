<?php namespace Acme\ScheduleCrawler\Interfaces;


/**
 * Crawls through UTSC Schedule
 */
Interface IScheduleCrawler {

	// Crawl for this month's UTSC Schedule
	public function crawlUTSCSchedule();

}
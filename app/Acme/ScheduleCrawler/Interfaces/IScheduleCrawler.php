<?php namespace Acme\Schedule\Interfaces;


/**
 * Crawls through UTSC Schedule
 */
Interface IScheduleCrawler {

	// Crawl for this month's UTSC Schedule
	public function crawlUTSCSchedule();

}
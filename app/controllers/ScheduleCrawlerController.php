<?php

use Acme\ScheduleCrawler\Interfaces\IScheduleCrawler;


class ScheduleCrawlerController extends BaseController {

	protected $scheduleCrawler;

	function __construct(IScheduleCrawler $scheduleCrawler)
	{
		$this->scheduleCrawler = $scheduleCrawler;
	}

	/**
	 * Crawls through UTSC Schedule & scrapes for activity & activity 
	 * sessions
	 * @return array Array of activity sessions
	 */
	public function crawlUTSCSchedule()
	{
		return $this->scheduleCrawler->crawlUTSCSchedule();
	}

}

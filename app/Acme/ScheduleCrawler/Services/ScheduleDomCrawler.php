<?php namespace Acme\ScheduleCrawler\Services;

use Acme\ScheduleCrawler\Interfaces\IScheduleCrawler;
use Acme\ScheduleCrawler\Interfaces\IDomCrawler;


/**
 * Goutte-powered DOM Crawler and Scraper
 */
class ScheduleDomCrawler implements IScheduleCrawler
{

	protected $domCrawler;

	/**
	 * Crawler utilizes DomCrawler
	 * @param IDomCrawler $domCrawler DomCrawler object
	 */
	function __construct(IDomCrawler $domCrawler)
	{
		$this->domCrawler = $domCrawler;
	}

	/**
	 * Crawls through UTSC Schedule for Activity and Activity Sessions
	 * @return void
	 */
	public function crawlUTSCSchedule()
	{
		return 'Schedule';
	}



}
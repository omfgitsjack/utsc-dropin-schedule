<?php namespace Acme\Schedule\Services;

// Inhouse dependencies
use Acme\Schedule\Interfaces\IScheduleCrawler;
use Acme\Schedule\Interfaces\IDomCrawler;


/**
 * Goutte-powered DOM Crawler and Scraper
 */
class ScheduleDomCrawler implements IScheduleCrawler
{

	// Dependencies
	protected $domCrawler;

	/**
	 * Crawler utilizes DomCrawler
	 * @param IDomCrawler         $domCrawler  DomCrawler object
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
		$utsc_link = 'http://www.utsc.utoronto.ca/athletics/calendar-node-field-date-time/month';

		// Create new Crawl Session
		$crawlSession = $this->domCrawler->createCrawlSession($utsc_link);

		// Retrieve crawl object
		$crawlObj = $this->domCrawler->getCrawlerObj($utsc_link);
		
		// Scrape for this month's activity sessions
		$activitySessions = $this->domCrawler->scrapeActivitySessions($crawlObj);

		// Scrape for this month's activities
		$activities = $this->domCrawler->scrapeActivities($activitySessions);

		// Store activities
		$this->domCrawler->storeActivities($activities);
		
		// Store activity sessions
		$this->domCrawler->storeActivitySessions($activitySessions, $crawlSession);
	}
}
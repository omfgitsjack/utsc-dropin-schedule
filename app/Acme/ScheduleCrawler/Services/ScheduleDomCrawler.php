<?php namespace Acme\Schedule\Services;

// Inhouse dependencies
use Acme\Schedule\Interfaces\IScheduleCrawler;
use Acme\Schedule\Interfaces\IDomCrawler;
use Acme\Schedule\Interfaces\ICrawlSessionRepository;

// 3rd party dependencies
use Carbon\Carbon;

/**
 * Goutte-powered DOM Crawler and Scraper
 */
class ScheduleDomCrawler implements IScheduleCrawler
{

	// Dependencies
	protected $domCrawler;
	protected $crawlSession;

	/**
	 * Crawler utilizes DomCrawler
	 * @param IDomCrawler         $domCrawler  DomCrawler object
	 */
	function __construct(IDomCrawler $domCrawler, ICrawlSessionRepository $crawlSession)
	{
		$this->domCrawler = $domCrawler;
		$this->crawlSession = $crawlSession;
	}

	/**
	 * Crawls through UTSC Schedule for Activity and Activity Sessions
	 * @return void
	 */
	public function crawlUTSCSchedule()
	{
		$utsc_link = 'http://www.utsc.utoronto.ca/athletics/calendar-node-field-date-time/month';

		// Setup CrawlSession and Crawler objects
		$crawlSession = $this->domCrawler->createCrawlSession($utsc_link);
		$crawlObj = $this->domCrawler->getCrawlerObj($utsc_link);
		
		// Start timing
		$startTime = Carbon::now();
		$this->crawlSession->updateStartTime($crawlSession, $startTime);

		// Scrape for this month's activity sessions and activities
		$activitySessions = $this->domCrawler->scrapeActivitySessions($crawlObj);
		$activities = $this->domCrawler->scrapeActivities($activitySessions);

		// Store activities & their sessions
		$this->domCrawler->storeActivities($activities);
		$this->domCrawler->storeActivitySessions($activitySessions, $crawlSession);

		// End timing
		$endTime = Carbon::now();
		$this->crawlSession->updateEndTime($crawlSession, $endTime);
		$this->crawlSession->updateDuration($crawlSession, $startTime->diffInSeconds($endTime));

		return $crawlSession;
	}
}
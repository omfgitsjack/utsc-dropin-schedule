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
		$utsc_base_route = 'http://www.utsc.utoronto.ca/athletics/calendar-node-field-date-time/month';

		// Calculate the current month
		$nextMonth = Carbon::now()->startOfMonth()->addMonth();
		$nextMonthYearString = $nextMonth->year;

		// Format the month portion of the query string correctly.
		if ($nextMonth->month < 10) {
			$nextMonthString = "0" . $nextMonth->month;
		} else {
			$nextMonthString = $nextMonth->month;
		}

		// Construct the query string
		$nextMonthQueryFormat = "?mini=" . $nextMonthYearString . "-" . $nextMonthString;

		// Create the links that correspond to the current & the subsequent month
		$linkToCurMonthUTSCSchedule = $utsc_base_route;
		$linkToNextMonthUTSCSchedule = $utsc_base_route . $nextMonthQueryFormat;

		// Ready to crawl.
		$crawlSession = $this->domCrawler->createCrawlSession();

		// Start timing
		$startTime = Carbon::now();
		$this->crawlSession->updateStartTime($crawlSession, $startTime);

		// Crawl through all relevant links
		$this->crawlLink($linkToCurMonthUTSCSchedule, $crawlSession);
		$this->crawlLink($linkToNextMonthUTSCSchedule, $crawlSession);

		// End timing
		$endTime = Carbon::now();
		$this->crawlSession->updateEndTime($crawlSession, $endTime);
		$this->crawlSession->updateDuration($crawlSession, $startTime->diffInSeconds($endTime));

		return $crawlSession;
	}

	private function crawlLink($link, $crawlSession)
	{
		// Setup CrawlSession and Crawler objects
		$crawlObj = $this->domCrawler->getCrawlerObj($link);

		// Scrape for this month's activity sessions and activities
		$activitySessions = $this->domCrawler->scrapeActivitySessions($crawlObj);
		$activities = $this->domCrawler->scrapeActivities($activitySessions);

		// Store activities & their sessions
		$this->domCrawler->storeActivities($activities);
		$this->domCrawler->storeActivitySessions($activitySessions, $crawlSession);

		return $crawlSession;
	}
}
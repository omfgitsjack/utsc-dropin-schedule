<?php namespace Acme\Schedule\Services;

// Inhouse dependencies
use Acme\Schedule\Interfaces\IScheduleRetriever;
use Acme\Schedule\Interfaces\IActivitySessionRepository;
use Acme\Schedule\Interfaces\ICrawlSessionRepository;

// 3rd party Dependencies
use Carbon\Carbon;

/**
 * Goutte-powered DOM Crawler and Scraper
 */
class ScheduleRetriever implements IScheduleRetriever
{

	// Dependencies
	protected $crawlSession;
	protected $activitySession;

	/**
	 * Crawler utilizes DomCrawler
	 * @param IDomCrawler         $domCrawler  DomCrawler object
	 */
	function __construct(IActivitySessionRepository $activitySession, ICrawlSessionRepository $crawlSession)
	{
		$this->activitySession = $activitySession;
		$this->crawlSession = $crawlSession;
	}

	/**
	 * Crawls through UTSC Schedule for Activity and Activity Sessions
	 * @return array activity sessions for this week
	 */
	public function getActivitySessionsForThisWeek($activityId)
	{
		// Get Latest CrawlSession
		$latestCrawlSession = $this->crawlSession->getLatest();

		// Get Activity Sessions
		$activitySessions = $latestCrawlSession
			->activitySessions()
			->where('activity_id', $activityId)
/*			->where('date', '>=', Carbon::now()->startOfWeek())
			->where('date', '<=', Carbon::now()->endOfWeek())*/
			->get();
		return $activitySessions;
	}
}
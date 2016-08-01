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
	 * Retrieve activity sessions for this week's activity
	 * @param $activityId
	 * @param $nextWeek
	 * @return array activity sessions for this week
	 */
	public function getActivitySessions($activityId, $weeks)
	{
		// Get Latest CrawlSession
		$latestCrawlSession = $this->crawlSession->getLatest();
		
		return $latestCrawlSession->activitySessions() // debugging
		
		// Get Activity Sessions
		$activitySessions = $latestCrawlSession
			->activitySessions()
			->where('activity_id', $activityId)
			->where('date', '>=', Carbon::now()->startOfWeek()->addWeeks($weeks))
			->where('date', '<=', Carbon::now()->endOfWeek()->addWeeks($weeks))
			->orderBy('date', 'ASC')
			->get();

		// Add Participants
		foreach ($activitySessions as $session)
		{
			$session['participants'] = $session->participants()->get();
		}

		return $activitySessions;
	}
}

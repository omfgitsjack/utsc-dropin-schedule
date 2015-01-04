<?php namespace Acme\Schedule\Strategies;

// Inhouse dependencies
use Acme\Schedule\Interfaces\IDomCrawler;
use Acme\Schedule\Interfaces\IDomScraper;
use Acme\Schedule\Interfaces\IActivityRepository;
use Acme\Schedule\Interfaces\IActivitySessionRepository;
use Acme\Schedule\Interfaces\ICrawlSessionRepository;

// Third party dependencies
use Goutte\Client;
use Illuminate\Support\Collection;


/**
 * Goutte powered Dom Crawler that scrapes and stores activity & 
 * their activity sessions
 */
class DomCrawler implements IDomCrawler
{

	// Dependencies
	protected $domScraper;
	protected $client;
	protected $activity;
	protected $activitySession;
	protected $crawlSession;

	/**
	 * Crawler utilizes DomCrawler
	 * @param DomScraper 					$domScrapper DomScraper object
	 * @param Client     					$client      Goutte Web Crawler
	 */
	function __construct(IDomScraper $domScraper, Client $client, IActivityRepository $activity, 
		IActivitySessionRepository $activitySession, ICrawlSessionRepository $crawlSession)
	{
		$this->domScraper = $domScraper;
		$this->client = $client;
		$this->activity = $activity;
		$this->activitySession = $activitySession;
		$this->crawlSession = $crawlSession;
	}

	public function createCrawlSession()
	{
		return $this->crawlSession->store([]);
	}

	/**
	 * Retrieves CrawlerObj for a given url
	 * @param  string $url Url we're crawling for
	 * @return Crawler      Crawler Object
	 */
	public function getCrawlerObj($url)
	{
		return $this->client->request('GET', $url);
	}

	/**
	 * Scrapes unique activities from a crawler object
	 * @param  array $activitySessions Array of this month's activity sessions
	 * @return array                   Array of unique activities
	 */
	public function scrapeActivities($activitySessions)
	{
		return $this->domScraper->scrapeUniqueActivities($activitySessions);
	}

	/**
	 * Scrapes activity sessions from a crawler object.
	 * @param  CrawlerObj $crawlerObj Crawler Object
	 * @return array
	 */
	public function scrapeActivitySessions($crawlerObj)
	{
		return $this->domScraper->scrapeActivitySessions($crawlerObj);
	}

	/**
	 * Stores activities
	 * @param  array $activities activities
	 * @return void
	 */
	public function storeActivities($activities)
	{
		$this->activity->storeMultiple($activities);
	}

	/**
	 * Stores activity sessions
	 * @param  array $activitySessions Activity Sessions
	 * @return void
	 */
	public function storeActivitySessions($activitySessions, $crawlSession)
	{
		foreach ($activitySessions as $day)
		{
			foreach ($day['activity_sessions'] as $activitySession)
			{
				// Retrieve Activity
				$activity = $this->activity->getUniqueActivity(
					$activitySession['activity'], 
					$activitySession['category'],
					$activitySession['women_only']);

				$session = $this->activitySession->storeOne([
						'date' => $activitySession['start_time'],
						'start_time' => $activitySession['start_time'],
						'end_time' => $activitySession['end_time'],
						'location' => $activitySession['location'],
						'activity_id' => $activity['id'],
						'crawl_session_id' => $crawlSession['id']
					]);
			}
		}
	}
}
<?php namespace Acme\Schedule\Repositories;

// Inhouse dependencies
use Acme\Schedule\Interfaces\ICrawlSessionRepository;
use CrawlSession;


class DbCrawlSessionRepository implements ICrawlSessionRepository {

	// Dependencies
	protected $model;

	/**
	 * Dependency Injection
	 * @param CrawlSession $crawlSession Crawl Session object
	 */
	function __construct(CrawlSession $crawlSession)
	{
		$this->model = $crawlSession;
	}

	public function store($crawlSession)
	{
		return $this->model->create($crawlSession);
	}

	public function getLatest()
	{
		return $this->model->where('id', 1)->first();
		return $this->model->orderBy('id', 'desc')->first();
	}

	public function updateStartTime($crawlSession, $time)
	{
		$crawlSession['start_time'] = $time;
		$crawlSession->save();
	}

	public function updateEndTime($crawlSession, $time)
	{
		$crawlSession['end_time'] = $time;
		$crawlSession->save();
	}

	public function updateDuration($crawlSession, $time)
	{
		$crawlSession['duration'] = $time;
		$crawlSession->save();
	}

}
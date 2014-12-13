<?php namespace Acme\ScheduleCrawler\Repositories;

// Inhouse dependencies
use Acme\ScheduleCrawler\Interfaces\IActivitySessionRepository;
use ActivitySession;


class DbActivitySessionRepository implements IActivitySessionRepository
{

	// Dependencies
	protected $model;

	/**
	 * Dependency Injection
	 * @param ActivitySession $activitySession Activity Session Object
	 */
	function __construct(ActivitySession $activitySession)
	{
		$this->model = $activitySession;
	}

	/**
	 * Stores one activity session
	 * @param  object $activitySession JSON object of an activity session
	 * @return ActivitySession                  
	 */
	public function storeOne($activitySession)
	{
		return $this->model->create($activitySession);
	}

	/**
	 * Stores multiple activity sessions
	 * @param  array $activitySessions Array of JSON activity sessions
	 * @return void
	 */
	public function storeMultiple($activitySessions)
	{
		foreach ($activitySessions as $activitySession)
		{
			$this->storeOne($activitySession);
		}
	}

	/**
	 * Retrieves activity sessions for this week
	 * @param  string $activity Name of activity
	 * @param  string $category Category of activity
	 * @return array            Array of activities for this week
	 */
	public function getSessionsForThisWeek($activity, $category)
	{
		return $this->model->getAll();
	}

}
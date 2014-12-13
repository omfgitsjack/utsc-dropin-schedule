<?php namespace Acme\Schedule\Repositories;

// Inhouse dependencies
use Activity;
use Acme\Schedule\Interfaces\IActivityRepository;


class DbActivityRepository implements IActivityRepository
{

	// Dependencies
	protected $model;

	/**
	 * Depdency injection
	 * @param Activity $activity Activity Model
	 */
	function __construct(Activity $activity)
	{
		$this->model = $activity;
	}

	/**
	 * Gets activity by it's activity (name) and category
	 * @param  string $activity Activity name
	 * @param  string $category Activity category
	 * @return Activity         Activity
	 */
	public function getByActivityAndCategory($activity, $category)
	{
		return $this->model->where('activity', $activity)->where('category', $category)->first();
	}

	/**
	 * Stores one activity into database
	 * @param  object $activity JSON activity object
	 * @return Activity         Activity Model
	 */
	public function storeOne($activity)
	{
		return $this->model->firstOrCreate($activity);
	}

	/**
	 * Stores multiple activities into the database
	 * @param  array $activities  Array of JSON activities
	 * @return void
	 */
	public function storeMultiple($activities)
	{
		foreach ($activities as $activity)
		{
			$this->storeOne($activity);
		}
	}

	/**
	 * Retrieves all activities with 'Drop In' category
	 * @return array Drop In activities
	 */
	public function getDropins()
	{
		return $this->model->where('category', 'Drop In')->get();
	}

}
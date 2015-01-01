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
	 * Gets activity by it's activity (name), category and women_only
	 * @param  string $activity Activity name
	 * @param  string $category Activity category
	 * @return Activity         Activity
	 */
	public function getUniqueActivity($activity, $category, $womenOnly)
	{
		return $this->model
			->where('activity', $activity)
			->where('category', $category)
			->where('women_only', $womenOnly)
			->first();
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

	/**
	 * Retrieves an activity by it's id
	 *
	 * @param $id
	 * @return activity
	 */
	public function getById($id)
	{
		return $this->model->where('id', $id)->first();
	}

}
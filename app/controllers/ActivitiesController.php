<?php

use Acme\Schedule\Interfaces\IActivityRepository;


class ActivitiesController extends \BaseController {

	protected $activity;

	function __construct(IActivityRepository $activity)
	{
		$this->activity = $activity;
	}

	/**
	 * Display a listing of the resource.
	 * GET /activities
	 *
	 * @return Response
	 */
	public function getDropins()
	{
		return $this->activity->getDropins();
	}

}
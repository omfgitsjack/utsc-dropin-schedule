<?php

use Acme\ScheduleCrawler\Interfaces\IActivityRepository;


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
	public function index()
	{
		return $this->activity->getDropins();
	}

}
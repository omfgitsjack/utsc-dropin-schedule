<?php namespace Acme\Schedule\Interfaces;



Interface IActivitySessionRepository {

	// Stores one activity session
	public function storeOne($activitySession);

	// Stores multiple activity sessions
	public function storeMultiple($activitySessions);

	// Stores sessions for this week
	public function getSessionsForThisWeek($activityId);

}
<?php namespace Acme\Schedule\Interfaces;


/**
 * Retrieves UTSC Schedule
 */
Interface IScheduleRetriever {

	// Retrieves this week's UTSC Schedule
	public function getActivitySessionsForThisWeek($activityId);

}
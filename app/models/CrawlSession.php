<?php


/**
 * Session object indicating when we crawled
 */
class CrawlSession extends \Eloquent {

	protected $fillable = ['start_time', 'end_time', 'duration'];
	
	// Relationships with other models
	public function activitySessions()
	{
		return $this->hasMany('ActivitySession');
	}

}
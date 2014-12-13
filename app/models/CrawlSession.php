<?php

class CrawlSession extends \Eloquent {

	protected $fillable = [];
	
	public function activitySessions()
	{
		return $this->hasMany('ActivitySession');
	}

}
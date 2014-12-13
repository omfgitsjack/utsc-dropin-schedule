<?php

class ActivitySession extends \Eloquent {

	protected $fillable = ['date', 'start_time', 'end_time', 'activity_id', 'crawl_session_id'];

	public function activity()
	{
		return $this->belongsTo('Activity');
	}

	public function crawlSession()
	{
		return $this->belongsTo('CrawlSession');
	}

}
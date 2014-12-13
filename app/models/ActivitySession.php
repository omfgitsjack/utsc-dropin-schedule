<?php

class ActivitySession extends \Eloquent {

	protected $fillable = ['date', 'start_time', 'end_time', 'activity_id'];

	public function activity()
	{
		return $this->belongsTo('Activity');
	}

}
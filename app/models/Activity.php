<?php

class Activity extends \Eloquent {

	protected $fillable = ['activity', 'category'];

	public function activitySessions()
	{
		return $this->hasMany('ActivitySession');
	}

}
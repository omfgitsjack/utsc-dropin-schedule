<?php

class Activity extends \Eloquent {

	protected $fillable = ['activity', 'category', 'women_only'];

	public function activitySessions()
	{
		return $this->hasMany('ActivitySession');
	}

}
<?php

class Participant extends \Eloquent {

	protected $fillable = ['name', 'phone_number', 'is_valid_number', 'activity_session_id'];

	public function activitySession()
	{
		return $this->belongsTo('ActivitySession');
	}

}
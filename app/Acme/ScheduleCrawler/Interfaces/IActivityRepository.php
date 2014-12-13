<?php namespace Acme\Schedule\Interfaces;



Interface IActivityRepository {

	// Gets an activity by activity & category
	public function getByActivityAndCategory($activity, $category);

	// Store one non duplicated activity
	public function storeOne($activity);

	// Store multiple non-duplicated activities
	public function storeMultiple($activities);

	// Retrieve activities with 'Dropin' category
	public function getDropins();

}
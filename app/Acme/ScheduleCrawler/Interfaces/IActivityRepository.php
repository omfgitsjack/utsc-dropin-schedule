<?php namespace Acme\Schedule\Interfaces;



Interface IActivityRepository {

	// Gets an activity by activity & category
	public function getUniqueActivity($activity, $category, $womenOnly);

	// Store one non duplicated activity
	public function storeOne($activity);

	// Store multiple non-duplicated activities
	public function storeMultiple($activities);

	// Retrieve activities with 'Dropin' category
	public function getDropins();

	// Retrieve an activity by id
	public function getById($id);

}
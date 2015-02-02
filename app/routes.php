<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('hello');
});

Route::group(array('after' => 'allowOrigin'), function() {
	Route::get('api/crawl', 'ScheduleCrawlerController@crawlUTSCSchedule');
	Route::get('api/activities', 'ActivitiesController@getDropins');
	Route::get('api/activities/{id}', 'ActivitiesController@getById');
	Route::get('api/activities/{activity_id}/sessions/{weeks}', 'ActivitySessionsController@getActivitySessions');
	Route::post('api/activities/{activity_id}/sessions/{session_id}/participants', 'ParticipantsController@storeMultiple');
});

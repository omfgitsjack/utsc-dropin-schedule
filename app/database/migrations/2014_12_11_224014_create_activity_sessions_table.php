<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateActivitysessionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('activity_sessions', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('activity_id')->unsigned();
			$table->integer('crawl_session_id')->unsigned();
			$table->timestamp('date');
			$table->timestamp('start_time');
			$table->timestamp('end_time');
			$table->string('location');
			$table->foreign('activity_id')->references('id')->on('activities')->onDelete('cascade');
			$table->foreign('crawl_session_id')->references('id')->on('crawl_sessions')->onDelete('cascade');
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('activity_sessions');
	}

}

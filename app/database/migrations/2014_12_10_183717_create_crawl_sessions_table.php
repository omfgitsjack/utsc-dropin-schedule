<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCrawlSessionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('crawl_sessions', function(Blueprint $table)
		{
			$table->increments('id');
			$table->timestamp('start_time')->nullable();
			$table->timestamp('end_time')->nullable();
			$table->integer('duration')->nullable();
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
		Schema::drop('crawl_sessions');
	}

}

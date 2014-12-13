<?php namespace Acme\Schedule\Interfaces;



Interface ICrawlSessionRepository {

	// Stores one activity session
	public function store($crawlSession);

}
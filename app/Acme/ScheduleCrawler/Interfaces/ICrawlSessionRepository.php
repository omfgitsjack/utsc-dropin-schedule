<?php namespace Acme\Schedule\Interfaces;

interface ICrawlSessionRepository {
    public function store($crawlSession);

    public function getLatest();

    public function updateStartTime($crawlSession, $time);

    public function updateEndTime($crawlSession, $time);

    public function updateDuration($crawlSession, $time);
}
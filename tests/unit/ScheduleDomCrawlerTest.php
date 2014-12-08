<?php

use Codeception\Verify;
use \Acme\ScheduleCrawler\Strategies\DomCrawler;
use Goutte\Client;


class ScheduleDomCrawlerTest extends \Codeception\TestCase\Test
{
    use Codeception\Specify;
    
    /**
    * @var \UnitTester
    */
    protected $tester;

    protected function _before()
    {
        $this->client = new Client();
        $this->domScraper = Mockery::mock('Acme\ScheduleCrawler\Strategies\DomScraper');
        $this->domCrawler = new DomCrawler($this->domScraper, $this->client);
    }

    protected function _after()
    {
    }

    // tests
    public function testCrawling()
    {
        // This won't work because specify isolates the block
/*        $this->specify("returns ActivitySessions", function() {
            $this->domScraper->shouldReceive('scrapeActivitySessions')->times(1)->andReturn("ActivitySessions");
            verify($this->domCrawler->scrapeUniqueActivities('obj'))->equals("ActivitySessions");
        });*/

        $this->domScraper->shouldReceive('scrapeActivitySessions')->times(1)->andReturn("ActivitySessions");
        verify($this->domCrawler->scrapeUniqueActivities('obj'))->equals("ActivitySessions");

/*
        // Isolated cases
        $this->specify("calls DomCrawler once", function() {
            $this->assertTrue(false);
        });

        $this->specify("uses DomCrawler", function() {
            verify(true)->true();
        });*/
    }

}
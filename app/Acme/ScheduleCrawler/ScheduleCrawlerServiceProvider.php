<?php namespace Acme;

use Illuminate\Support\ServiceProvider;

/**
 * This class binds all Schedule services/strategies to app space
 */
class ScheduleCrawlerServiceProvider extends ServiceProvider {

    public function register()
    {
        $this->app->bind(
            'Acme\ScheduleCrawler\Interfaces\IDomCrawler', 
            'Acme\ScheduleCrawler\Strategies\DomCrawler'
        );

        $this->app->bind(
            'Acme\ScheduleCrawler\Interfaces\IDomScraper', 
            'Acme\ScheduleCrawler\Strategies\DomScraper'
        );

        $this->app->bind(
            'Acme\ScheduleCrawler\Interfaces\IScheduleCrawler', 
            'Acme\ScheduleCrawler\Services\ScheduleDomCrawler'
        );
    }

}
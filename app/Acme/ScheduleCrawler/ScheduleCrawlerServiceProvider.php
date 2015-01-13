<?php namespace Acme;

use Illuminate\Support\ServiceProvider;

/**
 * This class binds all Schedule services/strategies to app space
 */
class ScheduleCrawlerServiceProvider extends ServiceProvider {

    public function register()
    {
        // Repositories
        $this->app->bind(
            'Acme\Schedule\Interfaces\IActivityRepository', 
            'Acme\Schedule\Repositories\DbActivityRepository'
        );

        $this->app->bind(
            'Acme\Schedule\Interfaces\IActivitySessionRepository', 
            'Acme\Schedule\Repositories\DbActivitySessionRepository'
        );

        $this->app->bind(
            'Acme\Schedule\Interfaces\ICrawlSessionRepository', 
            'Acme\Schedule\Repositories\DbCrawlSessionRepository'
        );

        $this->app->bind(
            'Acme\Schedule\Interfaces\IParticipantRepository',
            'Acme\Schedule\Repositories\DbParticipantRepository'
        );

        // Strategies
        $this->app->bind(
            'Acme\Schedule\Interfaces\IDomCrawler', 
            'Acme\Schedule\Strategies\DomCrawler'
        );

        $this->app->bind(
            'Acme\Schedule\Interfaces\IDomScraper', 
            'Acme\Schedule\Strategies\DomScraper'
        );

        // Services
        $this->app->bind(
            'Acme\Schedule\Interfaces\IScheduleCrawler', 
            'Acme\Schedule\Services\ScheduleDomCrawler'
        );

        $this->app->bind(
            'Acme\Schedule\Interfaces\IScheduleRetriever', 
            'Acme\Schedule\Services\ScheduleRetriever'
        );
    }

}
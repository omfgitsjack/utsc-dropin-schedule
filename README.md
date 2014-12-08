utsc-dropin-schedule
====================

composer dump-autoload -o
composer update
composer install

php artisan migrate:reset
php artisan migrate

php vendor/codeception/codeception/codecept ...
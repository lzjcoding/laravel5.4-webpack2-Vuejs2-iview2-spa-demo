<?php

namespace App\Providers;

use App\Extensions\JWTManager;
use Illuminate\Support\ServiceProvider;
use Tymon\JWTAuth\Providers\JWTAuthServiceProvider;

class CustomServiceProvider extends JWTAuthServiceProvider
{
    /**
     * Register the bindings for the JWT Manager.
     */
    protected function registerJWTManager()
    {
        $this->app->singleton('tymon.jwt.manager', function ($app) {
            $instance = new JWTManager(
                $app['tymon.jwt.provider.jwt'],
                $app['tymon.jwt.blacklist'],
                $app['tymon.jwt.payload.factory']
            );

            return $instance->setBlacklistEnabled((bool) $this->config('blacklist_enabled'));
        });
    }
}

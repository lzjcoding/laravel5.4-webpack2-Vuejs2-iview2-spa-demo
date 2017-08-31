<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['domain' => 'blog-api.cn', 'prefix' => 'api'], function () {
    Route::group(['namespace' => 'Admin', 'prefix' => 'admin'], function () {
        Route::get('/', 'AdminController@index');

        Route::post('/login', 'AuthController@login');
        Route::post('/logout', 'AuthController@logout');

        Route::group(['middleware' => ['auth:admin']], function () {
            Route::group(['prefix' => 'common'], function () {
                Route::post('upload_pic', 'CommonController@uploadPic');
            });

            Route::get('/userInfo', 'AuthController@user');

            Route::post('post/{id}/show', 'PostController@display');
            Route::post('post/{id}/hide', 'PostController@hide');
            Route::resource('post', 'PostController');

            Route::post('user/{id}/recover', 'UserController@recover');
            Route::post('user/{id}/forbidden', 'UserController@forbidden');
            Route::resource('user', 'UserController');
        });
    });

    Route::group(['namespace' => 'Blog', 'prefix' => 'blog'], function () {
        Route::resource('post', 'PostController');
    });
});
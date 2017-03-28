<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['domain' => 'blog-api.cn'], function () {
    Route::group(['namespace' => 'Admin', 'prefix' => 'admin'], function () {
        Route::get('/', 'AdminController@index');

        Route::post('/login', 'AuthController@login');
        Route::post('/logout', 'AuthController@logout');

        Route::group(['middleware' => ['jwt.refresh', 'auth:admin']], function () {
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

    Route::middleware('auth:api')->get('/user', function (Request $request) {
        return $request->user();
    });
});
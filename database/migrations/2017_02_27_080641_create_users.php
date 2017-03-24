<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username', 30)->unique();
            $table->string('password', 60);
            $table->string('nickname', 30)->unique();
            $table->string('front_cover', 100)->default('');
            $table->string('email', 320)->unique()->default('');
            $table->string('powerful_words', 300)->default('');
            $table->unsignedInteger('login_count')->comment('登录次数')->default(0);
            $table->unsignedInteger('last_login_time')->comment('最近一次登录时间')->default(0);
            $table->unsignedTinyInteger('status')->comment('状态，1：禁用 2：正常')->default(2);

            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}

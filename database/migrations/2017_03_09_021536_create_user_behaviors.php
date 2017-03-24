<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserBehaviors extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_behaviors', function (Blueprint $table) {
            $table->unsignedInteger('user_id');
            $table->string('like_ids', 3000)->comment();
            $table->string('comment_ids', 3000)->comment();
            $table->string('collect_ids', 3000)->comment();
            $table->string('share_ids', 3000)->comment();

            $table->primary('user_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_behaviors');
    }
}

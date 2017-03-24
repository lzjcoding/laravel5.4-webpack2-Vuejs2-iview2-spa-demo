<?php

use Illuminate\Database\Seeder;

class UsersPostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \Illuminate\Support\Facades\DB::transaction(function () {
            factory(\App\Models\User::class, 100)->create();
            factory(\App\Models\Post::class, 10000)->create();
        });
    }
}

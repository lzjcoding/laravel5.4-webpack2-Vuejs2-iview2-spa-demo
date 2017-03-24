<?php

use Illuminate\Database\Seeder;

class AdminsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Admin\Admin::insert([
            'name'     => '管理员',
            'username' => 'admin',
            'password' => \Illuminate\Support\Facades\Hash::make('admin'),
            'is_super' => 1
        ]);
    }
}

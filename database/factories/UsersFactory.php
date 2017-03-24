<?php

$factory->define(App\Models\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'username'       => $faker->unique()->userName,
        'password'       => $password ?: $password = bcrypt('123456'),
        'nickname'       => $faker->name,
        'front_cover'    => '',
        'email'          => $faker->unique()->safeEmail,
        'powerful_words' => $faker->text(100)
    ];
});

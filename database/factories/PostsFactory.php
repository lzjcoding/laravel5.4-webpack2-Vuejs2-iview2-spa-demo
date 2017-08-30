<?php

$factory->define(App\Models\Post::class, function (Faker\Generator $faker) {
    return [
        'title'     => $faker->text(30),
        'desc'      => $faker->text(),
        'content'   => $faker->text(1000),
        'click_num' => $faker->numberBetween(),
        'is_show'   => random_int(0, 1)
    ];
});

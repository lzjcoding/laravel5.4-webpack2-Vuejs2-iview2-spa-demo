<?php
namespace App\Models;

class Post extends Model
{

    public function scopeShow($Query)
    {
        $Query->where('is_show', self::YES);
    }
}
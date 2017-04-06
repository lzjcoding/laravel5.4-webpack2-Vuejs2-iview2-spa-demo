<?php
namespace App\Models;

class Post extends Model
{
    protected $fillable = [
        'title',
        'front_cover',
        'desc',
        'content',
        'is_show'
    ];

    public function scopeShow($Query)
    {
        $Query->where('is_show', self::YES);
    }
}
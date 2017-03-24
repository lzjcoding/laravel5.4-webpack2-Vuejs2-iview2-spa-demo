<?php
namespace App\Models;

class User extends Model
{
    const STATUS_FORBIDDEN = 1;
    const STATUS_NORMAL    = 2;

    protected $hidden = ['password', ''];
}
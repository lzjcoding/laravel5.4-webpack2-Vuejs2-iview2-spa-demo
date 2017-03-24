<?php
namespace App\Models\Admin;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model implements Authenticatable
{
    use \Illuminate\Auth\Authenticatable;

    protected $hidden = ['password', 'is_super', 'created_at', 'remember_token', 'updated_at'];
}
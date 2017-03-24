<?php
namespace App\Http\Controllers\Admin;

use App\Models\User;

class UserController extends Controller
{
    protected $model = User::class;
    protected $equalFields = ['id', 'status'];
    protected $likeFields = ['username', 'nickname', 'email'];
    protected $timeFields = ['created_at', 'updated_at'];

    public function forbidden($id)
    {
        $User = User::findOrFail($id);
        $User->status = User::STATUS_FORBIDDEN;
        $User->save();

        return $this->response();
    }

    public function recover($id)
    {
        $User = User::findOrFail($id);
        $User->status = User::STATUS_NORMAL;
        $User->save();

        return $this->response();
    }
}
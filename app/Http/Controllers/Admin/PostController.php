<?php
namespace App\Http\Controllers\Admin;

use App\Models\Post;

class PostController extends Controller
{
    protected $model = Post::class;
    protected $equalFields = ['id', 'user_id', 'is_show'];
    protected $likeFields = ['title'];
    protected $timeFields = ['created_at', 'updated_at'];

    protected function beforeIndex()
    {
        $this->getModelQuery();
    }

    public function show($id)
    {
        $this->getModelQuery()->where('id', $id)->update(['is_show' => Post::YES]);

        return $this->response();
    }

    public function hide($id)
    {
        $this->getModelQuery()->where('id', $id)->update(['is_show' => Post::NO]);

        return $this->response();
    }
}
<?php
namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Post;

class PostController extends Controller
{
    protected $model = Post::class;

    protected $rules = [
        'title'   => 'required|max:150',
        'desc'    => 'max:300',
        'content' => 'required'
    ];
    protected $attributes = [
        'title'   => '标题',
        'desc'    => '简介',
        'content' => '内容'
    ];

    protected function beforeIndex()
    {
        $this->getModelQuery()->show();
    }

    protected function beforeShow($id)
    {
        $this->getModelQuery()->show();
    }
}
<?php
namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Post;

class PostController extends Controller
{
    protected $model = Post::class;

    protected function beforeIndex()
    {
        $this->getModelQuery()->show();
    }

    protected function beforeShow($id)
    {
        $this->getModelQuery()->show();
    }
}
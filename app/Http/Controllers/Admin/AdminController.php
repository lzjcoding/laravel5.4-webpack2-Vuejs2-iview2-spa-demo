<?php
namespace App\Http\Controllers\Admin;

class AdminController extends Controller
{

    public function index()
    {
        return $this->response(['Hello World!']);
    }
}
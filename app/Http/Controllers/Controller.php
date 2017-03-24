<?php

namespace App\Http\Controllers;

use App\Http\Traits\QueryTrait;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests, QueryTrait;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function index()
    {
        if (method_exists($this, 'beforeIndex')) {
            $this->beforeIndex();
        }
        $Query = $this->getModelQuery();
        $this->prepareFilter($Query);
        $this->prepareSort($Query);
        $Models = $Query->paginate($this->getPageSize());
        if (method_exists($this, 'afterIndex')) {
            $this->afterIndex($Models);
        }

        return $this->response($Models);
    }

    public function show($id)
    {
        if (method_exists($this, 'beforeShow')) {
            $this->beforeShow($id);
        }
        $Model = $this->getModelQuery()->findOrFail($id);
        if (method_exists($this, 'afterShow')) {
            $this->afterShow($Model);
        }

        return $this->response($Model);
    }

    public function destroy($id)
    {
        $this->getModelQuery()->where('id', $id)->delete();

        return $this->response();
    }
}

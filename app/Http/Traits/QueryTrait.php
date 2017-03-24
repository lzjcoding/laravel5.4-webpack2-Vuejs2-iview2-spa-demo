<?php
namespace App\Http\Traits;

use Illuminate\Database\Eloquent\Builder;

trait QueryTrait
{
    protected static $modelCache = [];
    protected $model = Model::class;
    protected $request = null;
    protected $pageSize = 10;
    protected $equalFields = [];
    protected $likeFields = [];
    protected $timeFields = [];

    protected function getModelQuery($model = '', $forceCreate = false)
    {
        if (empty($this->model) && empty($model)) {
            throw new Error(500, 1, 'model设置有误');
        }

        $model = empty($model) ? $this->model : $model;
        if ($forceCreate) {
            return app($this->model)->query();
        }

        if (isset(self::$modelCache[$model])) {
            return self::$modelCache[$model];
        }

        self::$modelCache[$model] = app($this->model)->query();
        return self::$modelCache[$model];
    }

    protected function prepareFilter(Builder $Query)
    {
        $filters = json_decode($this->request->input('filter'), true);
        if (empty($filters)) {
            return;
        }

        foreach ($filters as $field => $filter) {
            if (! $filter) {
                continue;
            }
            $Query->where(function ($query) use ($field, $filter) {
                if (in_array($field, $this->equalFields)) {
                    if (is_array($filter) && count($filter) === 2) {
                        if ($filter[0] && $filter[1]) {
                            $query->whereBetween($field, $filter);
                        }
                    } else if (is_string($filter) || is_numeric($filter)) {
                        $query->where($field, $filter);
                    }
                } else if (in_array($field, $this->timeFields) && is_array($filter)) {
                    if ($filter[0] && $filter[1]) {
                        $filter = array_map(function ($value) {
                            return strtotime($value);
                        }, $filter);
                        $query->whereBetween($field, $filter);
                    }
                } else if (in_array($field, $this->likeFields) && (is_string($filter) || is_numeric($filter))) {
                    $query->where($field, 'like', '%'. $filter .'%');
                }
            });
        }
    }

    protected function prepareSort(Builder $Query)
    {
        $sortBy = $this->request->input('sort');
        $sortBy = $sortBy ? json_decode($sortBy, true) : [];
        foreach ($sortBy as $field => $order) {
            $Query->orderBy($field, $order);
        }

        $Query->orderBy('id', 'asc');
    }

    protected function getPageSize()
    {
        return $this->request->get('pageSize', $this->pageSize);
    }

    protected function response($data = [], $msg = 'success', $code = 0, $statusCode = 200)
    {
        return response(json_encode([
            'data'        => empty($data) ? [] : $data,
            'msg'         => $msg,
            'code'        => $code,
            'status_code' => $statusCode,
        ], JSON_UNESCAPED_UNICODE), $statusCode)->header('Content-Type', 'application/json');
    }
}
<?php

namespace App\Exceptions;

class Error extends \Exception
{
    private $_data = [];

    protected $statusCode = 500;

    public function __construct($statusCode = 500, $errCode = 'SYSTEM_FAILED', $message = '')
    {
        $config  = config("errorCode.{$errCode}");
        $this->code = isset($config['code']) ? $config['code'] : 1;
        $this->message = empty($message) && isset($config['msg']) ? $config['msg'] : $message;
        $this->statusCode = $statusCode;
    }


    public function setData($data)
    {
        $this->_data = $data;
        return $this;
    }


    public function getData()
    {
        return $this->_data;
    }


    public function getStatusCode()
    {
        return $this->statusCode;
    }
}
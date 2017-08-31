<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Response;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Exceptions\JWTException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        \Illuminate\Auth\AuthenticationException::class,
        \Illuminate\Auth\Access\AuthorizationException::class,
        \Symfony\Component\HttpKernel\Exception\HttpException::class,
        \Illuminate\Database\Eloquent\ModelNotFoundException::class,
        \Illuminate\Session\TokenMismatchException::class,
        \Illuminate\Validation\ValidationException::class,
        \App\Exceptions\Error::class
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
//        return parent::render($request, $e);
        $msg        = $e->getMessage();
        $data       = [];
        $code       = 1;
        $statusCode = 500;
        switch ($e) {
            case $e instanceof TokenMismatchException:
                $msg        = '登录超时，请重新登录';

            case ($e instanceof AuthenticationException) || ($e instanceof JWTException):
                $statusCode = 401;
                $code       = 1004;
                break;

            case $e instanceof ValidationException:
                $msg        = '填写数据有误';
                $data       = $e->validator->errors();
                $statusCode = 422;
                break;

            case $e instanceof Error:
                $data = $e->getData();
                $code = $e->getCode();
                break;

            case $e instanceof ModelNotFoundException:
                $msg        = '找不到对象';
                $statusCode = 404;
                break;

            default:
        }

        $statusCode = method_exists($e, 'getStatusCode') ? $e->getStatusCode() : $statusCode;
        $msg        = empty($msg) ? Response::$statusTexts[$statusCode] : $msg;

        return response(json_encode([
            'code'        => $code,
            'msg'         => $msg,
            'data'        => $data,
            'status_code' => $statusCode,
        ], JSON_UNESCAPED_UNICODE))->header('Content-Type', 'application/json');
    }

    /**
     * @param $request
     * @param AuthenticationException $exception
     * @return \Illuminate\Http\RedirectResponse
     * @throws AuthenticationException
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson()) {
            throw  $exception;
        }

        return redirect()->guest('login');
    }
}

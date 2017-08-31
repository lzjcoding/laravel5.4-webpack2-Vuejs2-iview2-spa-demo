<?php
namespace App\Http\Controllers\Admin;

use App\Exceptions\Error;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    protected function sendLoginResponse(Request $request)
    {
        $request->session()->regenerate();

        $this->clearLoginAttempts($request);

        return $this->response();
    }

    protected function sendFailedLoginResponse(Request $request)
    {
        throw new Error(401, 'LOGIN_FAIL');
    }

    public function username()
    {
        return 'username';
    }

    public function user()
    {
        return $this->response($this->guard()->user());
    }

    public function logout(Request $request)
    {
        $this->guard()->logout();

        $request->session()->flush();

        $request->session()->regenerate();

        return $this->response();
    }
}
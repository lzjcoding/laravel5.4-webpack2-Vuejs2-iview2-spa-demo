<?php
namespace App\Http\Controllers\Admin;

use App\Exceptions\Error;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    protected function attemptLogin(Request $request)
    {
        return $this->guard()->attempt($this->credentials($request), ['guard' => 'admin']);
    }

    protected function sendLoginResponse(Request $request)
    {
        $this->clearLoginAttempts($request);

        return $this->response()->header('Authorization', 'Bearer ' . $this->guard()->getToken());
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

    public function logout()
    {
        $this->guard()->logout();

        return $this->response();
    }
}
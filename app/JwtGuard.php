<?php
namespace App;

use Illuminate\Auth\GuardHelpers;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtGuard implements Guard
{
    use GuardHelpers;

    private $userProvider = null;
    private $loggedOut = false;

    public function __construct(UserProvider $userProvider)
    {
        $this->userProvider = $userProvider;
    }

    public function user()
    {
        if ($this->loggedOut) {
            return;
        }

        if (! is_null($this->user)) {
            return $this->user;
        }

        return $this->check() ? $this->user : null;
    }

    public function check()
    {
        if (! $User = JWTAuth::parseToken()->authenticate()) {
            return false;
        }

        $this->user = $User;

        return true;
    }

    public function attempt(array $credentials = [], array $customClaims = [])
    {
        $token = JWTAuth::attempt($credentials, $customClaims);
        if ($token) {
            JWTAuth::setToken($token);
            return true;
        } else {
            return false;
        }
    }

    public function once(array $credentials = [])
    {
        $User = $this->userProvider->retrieveByCredentials($credentials);
        if ($User && $this->userProvider->validateCredentials($User, $credentials)) {
            $this->user = $User;
            return $User;
        } else {
            return false;
        }
    }

    public function onceUsingId($id)
    {
        $AuthUser = $this->userProvider->retrieveById($id);
        $this->user = $AuthUser;

        return $AuthUser;
    }

    public function getToken()
    {
        return (string) JWTAuth::getToken();
    }

    public function logout()
    {
        $this->loggedOut = true;
        $this->user = null;
        return JWTAuth::invalidate();
    }

    public function validate(array $credentials = [])
    {
        return false;
    }
}
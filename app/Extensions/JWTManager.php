<?php
namespace App\Extensions;

use App\Jobs\InvalidateToken;
use Carbon\Carbon;
use Tymon\JWTAuth\Token;

class JWTManager extends \Tymon\JWTAuth\JWTManager
{
    /**
     * Refresh a Token and return a new Token.
     *
     * @param  \Tymon\JWTAuth\Token  $token
     * @return \Tymon\JWTAuth\Token
     */
    public function refresh(Token $token)
    {
        $payload = $this->setRefreshFlow()->decode($token);

        if ($this->blacklistEnabled) {
            // 延时一分钟失效旧token，避免客户端并行请求时后面的请求的token不可用
            dispatch((new InvalidateToken())->delay(Carbon::now()->addMinute(1)));
        }

        // return the new token
        return $this->encode(
            $this->payloadFactory->make([
                'sub' => $payload['sub'],
                'iat' => $payload['iat'],
            ])
        );
    }
}
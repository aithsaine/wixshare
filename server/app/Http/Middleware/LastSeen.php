<?php

namespace App\Http\Middleware;

use App\Events\UpdateUserStatus;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LastSeen
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check()) {
            $user = $request->user();
            $user->last_seen = now();
            $user->save();
            broadcast(new UpdateUserStatus($user));
        }
        return $next($request);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class AuthenticationController extends Controller
{
    public function login(Request $request)
    {
        try {

            $request->validate([
                "email" => ['required', 'exists:users,email'],
                "password" => ["required"]
            ]);
            $user = User::whereEmail($request->email)->first();
            if (Hash::check($request->password, $user->password)) {
                $token  = $user->createToken("auth_token")->plainTextToken;
                $tokentCookie = cookie("auth_token", $token, 60 * 24 * 3);
                return response()->json(["message" => "logged succefully", "success" => true, "status" => 200, "token" => $token, "user_picture" => $user->picture])->withCookie($tokentCookie);
            } else {
                return response(["password" => ["incorrect password"]], 422);
            }
        } catch (ValidationException $er) {
            return response($er->errors(), 422);
        }
    }
    public function register(Request $request)
    {
        try {
            $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
                'password' => ['required', 'confirmed', Password::defaults()],
                "birthday" => ["date"],
                "gender" => "required"

            ]);
            $user = User::create([
                "first_name" => $request->first_name,
                "last_name" => $request->last_name,
                "email" => $request->email,
                "password" => Hash::make($request->password),
                "birthday" => $request->birthday,
                "gender" => $request->gender
            ]);
            return response()->json(["success" => true]);
        } catch (ValidationException $er) {
            return response($er->errors(), 422);
        }
    }


    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        $tokentCookie = Cookie::forget("auth_token");

        return response(["success" => true])->withCookie($tokentCookie);
    }
}

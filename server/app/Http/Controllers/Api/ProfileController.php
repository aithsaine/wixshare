<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */


    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }
        if ($request->hasFile("picture")) {
            $request->validate(["picture" => "image", "mimes:png,jpg,jpeg"]);
            if ($request->user()->picture !== "profile.png") {

                if (Storage::exists('public/profiles/' . $request->user()->picture)) {
                    Storage::delete('publicprofiles/' . $request->user()->picture);
                }
            }
            $newName = uniqid() . "." . $request->file("picture")->getClientOriginalExtension();
            $savePict =   $request->file("picture")->storeAs("public/profiles", $newName);
            if ($savePict) {
                $request->user()->picture = $newName;
            }
        }

        $request->user()->save();

        return Redirect::route('dashboard');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function uploadOnlyPicture(Request $request)
    {
        try {

            $request->validate([
                "picture" => "required|mimes:jpg,png,gif,jpeg,webp",
            ]);
            if ($request->user()->picture !== "profile.png") {
                if (Storage::exists('profiles/' . $request->user()->picture)) {
                    Storage::delete('profiles/' . $request->user()->picture);
                }
            }
            $newName = uniqid() . "." . $request->file("picture")->getClientOriginalExtension();
            $savePict =   $request->file("picture")->storeAs("public/profiles", $newName);
            if ($savePict) {
                $request->user()->picture = $newName;
            }
            $request->user()->save();
            return response()->json(["success" => true]);
        } catch (ValidationException $err) {
            return response($err->errors(), 422);
        }
    }

    public function getUser($user_id)
    {
        $user = new UserResource(User::find($user_id));
        return response()->json(["success" => true, "status" => $user->status]);
    }
}

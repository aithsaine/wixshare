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
use Exception;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */


    /**
     * Update the user's profile information.
     */

    public function update(ProfileUpdateRequest $request)
    {
        $user = $request->user();
        $validatedData = $request->validated();

        // Fill user data
        $user->fill($validatedData);

        // Check if email has been changed and reset email verification if so
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        // Validate and handle the profile picture if it exists
        if ($request->hasFile('picture')) {
            $request->validate([
                'picture' => 'image|mimes:png,jpg,jpeg',
            ]);

            // Delete the old profile picture if it exists and is not the default
            if ($user->picture !== 'profile.png' && File::exists(public_path('storage/profiles/' . $user->picture))) {
                File::delete(public_path('storage/profiles/' . $user->picture));
            }

            // Generate a new unique name for the picture
            $newName = uniqid() . '.' . $request->file('picture')->getClientOriginalExtension();

            // Store the new picture in public/storage/profiles
            $request->file('picture')->move(public_path('storage/profiles'), $newName);

            // Update the user's picture field if the storage was successful
            $user->picture = $newName;
        }

        // Save user data
        $user->save();

        // Return updated user resource
        return response()->json([
            'user' => new UserResource($user),
            'success' => true,
        ]);
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

                if (File::exists(public_path('storage/profiles/' . $request->user()->picture))) {
                    File::delete(public_path('storage/profiles/' . $request->user()->picture));
                }
            }
            $newName = uniqid() . '.' . $request->file('picture')->getClientOriginalExtension();

            // Store the new picture in public/storage/profiles
            $request->file('picture')->move(public_path('storage/profiles'), $newName);

            // Update the user's picture field if the storage was successful

            $request->user()->picture = $newName;
            $request->user()->save();
            $user = new UserResource($request->user());
            return response()->json(["success" => true, "user" => $user]);
        } catch (ValidationException $err) {
            return response($err->errors(), 422);
        }
    }

    public function getUser($user_id)
    {
        $user = new UserResource(User::find($user_id));
        return response()->json(["success" => true, "status" => $user->status]);
    }

    public function AddDescription(Request $request)
    {
        try {
            $request->validate([
                "description" => "required|max:3000|min:50"
            ]);
            $request->user()->description = $request->description;
            $request->user()->save();
            return response()->json(["success" => true, "description" => $request->description]);
        } catch (ValidationException $er) {
            return response($er->errors(), 422);
        }
    }


    public function uploadCover(Request $request)
    {
        try {
            $request->validate([
                "cover" => "image|mimes:png,jpg,jpeg,gif|dimensions:min_width:500,max_height:100"
            ]);
            $user =   $request->user();
            $name = uniqid() . "." . $request->cover->getClientOriginalExtension();

            if (File::exists(public_path('storage/covers/' . $user->cover))) {
                File::delete(public_path('storage/covers/' . $user->cover));
            }
            $save = $request->file('cover')->move(public_path('storage/covers'), $name);
            if ($save) {
                $user->cover = $name;
                $user->save();
                return response()->json(["success" => true, 'cover' => $user->cover]);
            }
        } catch (ValidationException $er) {
            return response($er->errors(), 422);
        }
    }


    public function changePassword(Request $request)
    {
        try {

            $request->validate([
                "current_password" => "required",
                "new_password" => "required",
                "new_password_confirmation" => "required"
            ]);
            if (Hash::check($request->current_password, $request->user()->password)) {
                if ($request->new_password === $request->new_password_confirmation) {
                    if (
                        $request->new_password == $request->current_password
                    ) {
                        return response()->json(["msg" => "choose deferent new password"], 402);
                    }

                    $request->user()->password = Hash::make($request->new_password);
                    $request->user()->save();
                    return response()->json(["success" => true, "message" => "password updated with success"]);
                }
                return response()->json(["msg" => "new password and confirme password not the same"], 402);
            } else {
                return response()->json(["msg" => "password mismatch"], 402);
            }
        } catch (ValidationException $er) {
            return response($er->errors(), 401);
        }
    }
}
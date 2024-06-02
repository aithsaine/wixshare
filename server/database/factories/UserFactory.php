<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $fname = fake()->firstName();
        $lname = fake()->lastName();
        return [
            'first_name' => $fname,
            'last_name' => $lname,
            'email' => $fname . "-" . $lname . "@gmail.com",
            "gender" => array_rand(["male", "female"]),
            "birthday" => fake()->dateTimeBetween("-40 years", "-20 years")->format("Y-m-d"),
            'password' => Hash::make("adminadmin"),
            "description" => fake()->realText(400),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}

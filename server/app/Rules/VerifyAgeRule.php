<?php

namespace App\Rules;

use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class VerifyAgeRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        try {
            $dateOfBirth = Carbon::createFromFormat("Y-m-d", $value);
            $age = Carbon::today()->diffInYears($dateOfBirth);

            if (-$age < 16) {
                $fail(" The minimum age requirement is 16 years old.");
            }
        } catch (\Exception $e) {
            $fail("Invalid date format or date out of range.");
        }
    }
}

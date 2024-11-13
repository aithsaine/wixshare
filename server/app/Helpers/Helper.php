<?php

namespace App\Helpers;

use Carbon\Carbon;

class Helper
{
    public static function userLastActivityStatus($val): ?string
    {
        $timestamp = Carbon::parse($val);

        $lastSeenFormat = $timestamp->isToday() ? "Last seen today at {$timestamp?->format('H:i')}" : ($timestamp?->isYesterday()
            ? "Last seen yesterday at {$timestamp?->format('H:i')}"
            : "Last seen at {$timestamp?->format('d/m/Y H:i')}"
        );

        return $timestamp?->gt(now()->subSeconds(5)) ? 'Online' : $lastSeenFormat;
    }
    public static function  getDate($dt)
    {
        if (\Carbon\Carbon::parse($dt)->diffInSeconds(Carbon::now()) < 5) {
            return "just now";
        }
        if (\Carbon\Carbon::parse($dt)->diffInSeconds(Carbon::now()) < 60) {
            return (int)\Carbon\Carbon::parse($dt)->diffInSeconds(Carbon::now()) . " seconds ago";
        }
        if (\Carbon\Carbon::parse($dt)->diffInMinutes(Carbon::now()) < 60) {
            return (int)\Carbon\Carbon::parse($dt)->diffInMinutes(Carbon::now()) . "min ago";
        }
        if (\Carbon\Carbon::parse($dt)->diffInHours(Carbon::now()) < 24) {
            return (int)\Carbon\Carbon::parse($dt)->diffInHours(Carbon::now()) . "h ago";
        }
        if (\Carbon\Carbon::parse($dt)->diffInDays(Carbon::now()) < 7) {
            return (int)\Carbon\Carbon::parse($dt)->diffInDays(Carbon::now()) . "d ago";
        }
        if (\Carbon\Carbon::parse($dt)->diffInWeeks(Carbon::now()) <= 5) {
            return (int)\Carbon\Carbon::parse($dt)->diffInWeeks(Carbon::now()) . " weeks ago";
        }
        if (\Carbon\Carbon::parse($dt)->diffInMonths(Carbon::now()) < 12) {
            return (int)\Carbon\Carbon::parse($dt)->diffInMonths(Carbon::now()) . " months ago";
        }

        return (int)\Carbon\Carbon::parse($dt)->diffInYears(Carbon::now()) . "y ago";
    }
}

<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\EventTicketTypeController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('events', \App\Http\Controllers\EventController::class);

    Route::prefix('events/{event}/ticket-types')
        ->name('events.ticket-types.')
        ->group(function () {
            Route::get('/', [EventTicketTypeController::class, 'index'])
                ->name('index');

            Route::get('/create', [EventTicketTypeController::class, 'create'])
                ->name('create');

            Route::post('/', [EventTicketTypeController::class, 'store'])
                ->name('store');
        });
});

Route::get('/auth/google', [GoogleController::class, 'redirect'])->name('google.redirect');

Route::get('/auth/google/callback', [GoogleController::class, 'callback'])->name('google.callback');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

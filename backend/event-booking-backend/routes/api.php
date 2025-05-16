<?php
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\BookingController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/events', [EventController::class, 'index']);
    Route::get('/events/{id}', [EventController::class, 'show']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/my-bookings', [BookingController::class, 'index']);

    Route::middleware([AdminMiddleware::class])->group(function () {
        Route::post('/events', [EventController::class, 'store']);
        Route::put('/events/{id}', [EventController::class, 'update']);
        Route::delete('/events/{id}', [EventController::class, 'destroy']);
    });
});

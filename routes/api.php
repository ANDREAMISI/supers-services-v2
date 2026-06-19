<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminController;

Route::post('/admin/login', [AdminController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/me', [AdminController::class, 'me']);
    Route::post('/admin/logout', [AdminController::class, 'logout']);
});

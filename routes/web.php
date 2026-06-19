<?php

use App\Http\Controllers\Api\PublicController;
use App\Http\Controllers\Api\AdminController;
use Illuminate\Support\Facades\Route;

// Route principale
Route::get('/', function () {
    return view('app');
})->name('home');

require __DIR__.'/auth.php';

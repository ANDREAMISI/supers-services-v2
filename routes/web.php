<?php

use App\Http\Controllers\Api\PublicController;
use App\Http\Controllers\Api\AdminController;
use Illuminate\Support\Facades\Route;

// Route principale
Route::get('/', function () {
    return view('app');
})->name('home');

// ========== ROUTES API ==========
Route::prefix('api/v1')->group(function () {
    
    // Routes publiques
    Route::get('/settings', [PublicController::class, 'settings']);
    Route::get('/services', [PublicController::class, 'services']);
    Route::get('/testimonials', [PublicController::class, 'testimonials']);
    Route::post('/contact', [PublicController::class, 'contact']);
    
    // Admin Login (sans sanctum pour l'instant)
    Route::post('/admin/login', [AdminController::class, 'login']);
    
    // Routes protégées
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/admin/me', [AdminController::class, 'me']);
        Route::post('/admin/logout', [AdminController::class, 'logout']);
        Route::get('/admin/stats', [AdminController::class, 'stats']);
        
        // Services
        Route::get('/admin/services', [AdminController::class, 'index']);
        Route::post('/admin/services', [AdminController::class, 'store']);
        Route::put('/admin/services/{id}', [AdminController::class, 'update']);
        Route::delete('/admin/services/{id}', [AdminController::class, 'destroy']);
        Route::patch('/admin/services/{id}/toggle', [AdminController::class, 'toggleService']);
        Route::post('/admin/services/reorder', [AdminController::class, 'reorderServices']);
        
        // Testimonials
        Route::get('/admin/testimonials', [AdminController::class, 'indexTestimonials']);
        Route::post('/admin/testimonials', [AdminController::class, 'storeTestimonial']);
        Route::put('/admin/testimonials/{id}', [AdminController::class, 'updateTestimonial']);
        Route::delete('/admin/testimonials/{id}', [AdminController::class, 'destroyTestimonial']);
        Route::patch('/admin/testimonials/{id}/approve', [AdminController::class, 'approveTestimonial']);
        
        // Messages
        Route::get('/admin/messages', [AdminController::class, 'messages']);
        Route::patch('/admin/messages/{id}/status', [AdminController::class, 'updateMessageStatus']);
        Route::delete('/admin/messages/{id}', [AdminController::class, 'deleteMessage']);
        
        // Settings
        Route::get('/admin/settings', [AdminController::class, 'getSettings']);
        Route::put('/admin/settings', [AdminController::class, 'updateSettings']);
    });
});

require __DIR__.'/auth.php';
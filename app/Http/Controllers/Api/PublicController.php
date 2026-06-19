<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\Setting;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class PublicController extends Controller
{
    public function settings()
    {
        $settings = Setting::first();
        if (!$settings) {
            // Utiliser create au lieu de fill
            $settings = new Setting();
            $settings->home_title = ['fr' => 'Innovation et Précision au cœur', 'en' => 'Innovation and Precision at the Heart'];
            $settings->home_subtitle = ['fr' => 'De notre impression', 'en' => 'Of our printing'];
            $settings->home_description = ['fr' => 'Description', 'en' => 'Description'];
            $settings->phone = '+243991888245';
            $settings->email = 'contact.supersservices@gmail.com';
            $settings->address = 'N°58, Avenue des Cadets, Kananga – RDC';
            $settings->whatsapp_number = '243991888245';
            $settings->save();
        }
        return response()->json($settings);
    }

    public function services()
    {
        return response()->json(Service::where('is_active', true)->orderBy('order')->get());
    }

    public function testimonials()
    {
        return response()->json(Testimonial::where('is_approved', true)->orderBy('created_at', 'desc')->get());
    }

    public function submitTestimonial(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'content' => 'required|string',
            'rating' => 'nullable|integer|min:1|max:5'
        ]);

        $testimonial = Testimonial::create([
            'name' => [
                'fr' => $validated['name'],
                'en' => $validated['name'],
                'ln' => $validated['name'],
                'sw' => $validated['name'],
            ],
            'position' => [
                'fr' => $validated['position'] ?? '',
                'en' => $validated['position'] ?? '',
                'ln' => $validated['position'] ?? '',
                'sw' => $validated['position'] ?? '',
            ],
            'content' => [
                'fr' => $validated['content'],
                'en' => $validated['content'],
                'ln' => $validated['content'],
                'sw' => $validated['content'],
            ],
            'rating' => $validated['rating'] ?? 5,
            'is_approved' => false,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Votre témoignage a été envoyé pour validation.',
            'testimonial' => $testimonial,
        ], 201);
    }

    public function contact(Request $request)
    {
        $executed = RateLimiter::attempt(
            'contact:' . $request->ip(),
            5,
            function() {}
        );

        if (!$executed) {
            return response()->json([
                'message' => 'Trop de tentatives. Veuillez réessayer dans une minute.'
            ], 429);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string'
        ]);

        Message::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Votre message a été envoyé avec succès !'
        ], 201);
    }
}
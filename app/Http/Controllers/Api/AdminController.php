<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\Message;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    // ========== AUTH ==========
public function login(Request $request)
{
    try {
        if (!$request->has('email')) {
            $raw = $request->getContent();
            if (!$raw) {
                $raw = @file_get_contents('php://input');
            }

            if ($raw) {
                $raw = preg_replace('/^\xEF\xBB\xBF/', '', $raw);
                $data = json_decode($raw, true);
                if (is_array($data) && !empty($data)) {
                    $request->merge($data);
                }
            }
        }

        $request->validate([            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();
        \Log::info('Utilisateur trouvé', ['user' => $user ? 'Oui' : 'Non']);

        if (!$user || !Hash::check($request->password, $user->password)) {
            \Log::warning('Échec de connexion', ['email' => $request->email]);
            return response()->json([
                'message' => 'Les identifiants sont incorrects.'
            ], 401);
        }

        // Créer le token avec Sanctum
        $token = $user->createToken('admin-token')->plainTextToken;
        \Log::info('Connexion réussie', ['email' => $request->email]);

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    } catch (\Exception $e) {
        \Log::error('Erreur login', ['error' => $e->getMessage()]);
        return response()->json([
            'message' => 'Erreur serveur: ' . $e->getMessage()
        ], 500);
    }
}

    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnecté']);
    }

    public function updateProfile(Request $request)
    {
        try {
            $user = $request->user();
            
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email,' . $user->id,
            ]);

            $user->update($validated);
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function updatePassword(Request $request)
    {
        try {
            $user = $request->user();
            
            $validated = $request->validate([
                'current_password' => 'required|string',
                'new_password' => 'required|string|min:6',
            ]);

            if (!Hash::check($validated['current_password'], $user->password)) {
                return response()->json(['message' => 'Le mot de passe actuel est incorrect.'], 401);
            }

            $user->update(['password' => $validated['new_password']]);
            return response()->json(['message' => 'Mot de passe mis à jour avec succès']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    // ========== STATS ==========
    public function stats()
    {
        return response()->json([
            'total_messages' => Message::count(),
            'unread_messages' => Message::where('status', 'unread')->count(),
            'active_services' => Service::where('is_active', true)->count(),
            'total_testimonials' => Testimonial::count(),
            'messages_by_month' => Message::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count')
                ->where('created_at', '>=', now()->subMonths(11))
                ->groupBy('month')
                ->orderBy('month')
                ->get()
        ]);
    }

    // ========== SERVICES ==========
    public function index()
    {
        return response()->json(Service::orderBy('order')->get());
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|array',
                'title.fr' => 'required|string',
                'title.en' => 'required|string',
                'description' => 'required|array',
                'description.fr' => 'required|string',
                'description.en' => 'required|string',
                'icon' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'is_active' => 'boolean'
            ]);

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $directory = public_path('service-images');
                if (!file_exists($directory)) {
                    mkdir($directory, 0755, true);
                }
                $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move($directory, $filename);
                $validated['image'] = '/service-images/' . $filename;
            }

            $validated['order'] = Service::max('order') + 1;
            $validated['is_active'] = $request->boolean('is_active', true);
            $service = Service::create($validated);

            return response()->json($service, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $service = Service::findOrFail($id);
            
            $validated = $request->validate([
                'title' => 'required|array',
                'title.fr' => 'required|string',
                'title.en' => 'required|string',
                'description' => 'required|array',
                'description.fr' => 'required|string',
                'description.en' => 'required|string',
                'icon' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'is_active' => 'boolean'
            ]);

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $directory = public_path('service-images');
                if (!file_exists($directory)) {
                    mkdir($directory, 0755, true);
                }
                $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move($directory, $filename);
                $validated['image'] = '/service-images/' . $filename;
            }

            $service->update($validated);
            return response()->json($service);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $service = Service::findOrFail($id);
            $service->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function toggleService($id)
    {
        try {
            $service = Service::findOrFail($id);
            $service->update(['is_active' => !$service->is_active]);
            return response()->json($service);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function reorderServices(Request $request)
    {
        try {
            $request->validate([
                'services' => 'required|array',
                'services.*.id' => 'required|exists:services,id',
                'services.*.order' => 'required|integer'
            ]);

            foreach ($request->services as $data) {
                Service::where('id', $data['id'])->update(['order' => $data['order']]);
            }

            return response()->json(['message' => 'Ordre mis à jour']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    // ========== TESTIMONIALS ==========
    public function indexTestimonials()
    {
        return response()->json(Testimonial::orderBy('created_at', 'desc')->get());
    }

    public function storeTestimonial(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|array',
                'name.fr' => 'required|string',
                'name.en' => 'required|string',
                'position' => 'required|array',
                'position.fr' => 'required|string',
                'position.en' => 'required|string',
                'content' => 'required|array',
                'content.fr' => 'required|string',
                'content.en' => 'required|string',
                'rating' => 'required|integer|min:1|max:5',
            ]);

            $testimonial = Testimonial::create($validated);
            return response()->json($testimonial, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function updateTestimonial(Request $request, $id)
    {
        try {
            $testimonial = Testimonial::findOrFail($id);
            
            $validated = $request->validate([
                'name' => 'required|array',
                'name.fr' => 'required|string',
                'name.en' => 'required|string',
                'position' => 'required|array',
                'position.fr' => 'required|string',
                'position.en' => 'required|string',
                'content' => 'required|array',
                'content.fr' => 'required|string',
                'content.en' => 'required|string',
                'rating' => 'required|integer|min:1|max:5',
                'is_approved' => 'boolean'
            ]);

            $testimonial->update($validated);
            return response()->json($testimonial);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function destroyTestimonial($id)
    {
        try {
            $testimonial = Testimonial::findOrFail($id);
            $testimonial->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function approveTestimonial($id)
    {
        try {
            $testimonial = Testimonial::findOrFail($id);
            $testimonial->update(['is_approved' => !$testimonial->is_approved]);
            return response()->json($testimonial);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    // ========== MESSAGES ==========
    public function messages(Request $request)
    {
        $query = Message::query();
        
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }
        
        return response()->json($query->orderBy('created_at', 'desc')->get());
    }

    public function updateMessageStatus(Request $request, $id)
    {
        try {
            $message = Message::findOrFail($id);
            $request->validate(['status' => 'required|in:unread,read,processed']);
            $message->update(['status' => $request->status]);
            return response()->json($message);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function deleteMessage($id)
    {
        try {
            $message = Message::findOrFail($id);
            $message->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    // ========== SETTINGS ==========
    public function getSettings()
    {
        $settings = Setting::first();
        if (!$settings) {
            $settings = Setting::create([
                'home_title' => ['fr' => 'Innovation et Précision au cœur', 'en' => 'Innovation and Precision at the Heart'],
                'home_subtitle' => ['fr' => 'De notre impression', 'en' => 'Of our printing'],
                'home_description' => ['fr' => 'Ets Supers Services est une entreprise congolaise dynamique...', 'en' => 'Ets Supers Services is a dynamic Congolese company...'],
                'phone' => '+243991888245',
                'email' => 'contact.supersservices@gmail.com',
                'address' => 'N°58, Avenue des Cadets, Kananga – RDC',
                'whatsapp_number' => '243991888245'
            ]);
        }
        return response()->json($settings);
    }

    public function updateSettings(Request $request)
    {
        try {
            $settings = Setting::first();
            if (!$settings) {
                $settings = new Setting();
            }
            
            $validated = $request->validate([
                'home_title' => 'required|array',
                'home_title.fr' => 'required|string',
                'home_title.en' => 'required|string',
                'home_subtitle' => 'required|array',
                'home_subtitle.fr' => 'required|string',
                'home_subtitle.en' => 'required|string',
                'home_description' => 'required|array',
                'home_description.fr' => 'required|string',
                'home_description.en' => 'required|string',
                'phone' => 'required|string',
                'phone_secondary' => 'nullable|string',
                'email' => 'required|email',
                'address' => 'required|string',
                'whatsapp_number' => 'required|string',
                'primary_color' => 'nullable|string',
                'secondary_color' => 'nullable|string'
            ]);

            $settings->fill($validated);
            $settings->save();
            return response()->json($settings);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
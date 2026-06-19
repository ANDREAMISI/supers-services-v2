<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@supers-services.com'],
            [
                'name' => 'Administrateur',
                'email' => 'admin@supers-services.com',
                'password' => Hash::make('Admin123!'),
            ]
        );
    }
}
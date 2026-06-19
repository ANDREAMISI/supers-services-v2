<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->json('home_title');
            $table->json('home_subtitle');
            $table->json('home_description');
            $table->string('phone');
            $table->string('phone_secondary')->nullable();
            $table->string('email');
            $table->string('address');
            $table->string('whatsapp_number');
            $table->json('social_links')->nullable();
            $table->string('primary_color')->default('#FE6700');
            $table->string('secondary_color')->default('#195526');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
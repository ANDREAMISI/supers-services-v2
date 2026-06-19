<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'home_title',
        'home_subtitle',
        'home_description',
        'phone',
        'phone_secondary',
        'email',
        'address',
        'whatsapp_number',
        'social_links',
        'primary_color',
        'secondary_color'
    ];

    protected $casts = [
        'home_title' => 'array',
        'home_subtitle' => 'array',
        'home_description' => 'array',
        'social_links' => 'array'
    ];
}
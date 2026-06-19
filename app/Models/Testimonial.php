<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'position',
        'content',
        'rating',
        'is_approved',
        'image'
    ];

    protected $casts = [
        'name' => 'array',
        'position' => 'array',
        'content' => 'array',
        'is_approved' => 'boolean'
    ];
}
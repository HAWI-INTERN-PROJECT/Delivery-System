<?php

namespace App\Models;

use App\Notifications\V1\ResetPasswordNotification;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'username',
        'phone',
        'password',
        'role',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
 * Relationships
 */

/**
 * @return HasOne<DriverProfile, $this>
 */
public function driverProfile(): HasOne
{
    return $this->hasOne(DriverProfile::class);
}

/**
 * @return HasOne<Restaurant, $this>
 */
public function restaurant(): HasOne
{
    return $this->hasOne(Restaurant::class, 'manager_id');
}

/**
 * @return HasMany<Order, $this>
 */
public function orders(): HasMany
{
    return $this->hasMany(Order::class, 'customer_id');
}

/**
 * @return HasMany<CartItem, $this>
 */
public function cartItems(): HasMany
{
    return $this->hasMany(CartItem::class, 'customer_id');
}

/**
 * @return HasMany<Rating, $this>
 */
public function ratings(): HasMany
{
    return $this->hasMany(Rating::class, 'customer_id');
}

    /**
     * Send the password reset notification.
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }
}
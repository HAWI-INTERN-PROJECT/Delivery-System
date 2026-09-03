<?php

namespace App\Policies;

use App\Models\Restaurant;
use App\Models\User;

class RestaurantPolicy
{
    /**
     * Determine whether the user can update the restaurant.
     */
    public function update(User $user, Restaurant $restaurant): bool
    {
        return $user->id === $restaurant->manager_id;
    }

    /**
     * Determine whether the user can update approval status.
     */
    public function updateApprovalStatus(User $user, Restaurant $restaurant): bool
    {
        return $user->role === 'admin';
    }

    /**
     * Determine whether the user can delete the restaurant.
     */
    public function delete(User $user, Restaurant $restaurant): bool
    {
        return $user->role === 'admin';
    }
}
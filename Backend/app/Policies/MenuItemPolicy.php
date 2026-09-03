<?php

namespace App\Policies;

use App\Models\MenuItem;
use App\Models\Restaurant;
use App\Models\User;

class MenuItemPolicy
{
    /**
     * Determine whether the user can create a menu item for the restaurant.
     */
    public function create(User $user, Restaurant $restaurant): bool
    {
        return $user->id === $restaurant->manager_id;
    }

    /**
     * Determine whether the user can update the menu item.
     */
    public function update(User $user, MenuItem $menuItem): bool
    {
        return $user->id === $menuItem->restaurant->manager_id;
    }

    /**
     * Determine whether the user can delete the menu item.
     */
    public function delete(User $user, MenuItem $menuItem): bool
    {
        return $user->id === $menuItem->restaurant->manager_id;
    }
}
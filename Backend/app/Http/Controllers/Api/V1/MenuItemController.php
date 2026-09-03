<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\MenuItem\StoreMenuItemRequest;
use App\Http\Requests\V1\MenuItem\UpdateMenuItemRequest;
use App\Http\Resources\V1\MenuItemResource;
use App\Http\Traits\ApiResponse;
use App\Models\MenuItem;
use App\Models\Restaurant;
use App\Services\ActivityLogger;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Storage;

class MenuItemController extends Controller
{
    use ApiResponse;

    /**
     * Retrieve all available menu items from approved and active restaurants.
     *
     * Public endpoint.
     */
    public function index(): AnonymousResourceCollection
    {
        $menuItems = MenuItem::query()
            ->where('is_available', true)
            ->whereHas('restaurant', function ($query): void {
                $query->where('approval_status', 'approved')
                    ->where('status', 'active');
            })
            ->latest()
            ->get();

        return MenuItemResource::collection($menuItems);
    }

    /**
     * Display an available menu item from an approved and active restaurant.
     *
     * Public endpoint.
     */
    public function show(MenuItem $menuItem): MenuItemResource|JsonResponse
    {
        $menuItem->load('restaurant', 'category');

        if (
            ! $menuItem->is_available ||
            $menuItem->restaurant->approval_status !== 'approved' ||
            $menuItem->restaurant->status !== 'active'
        ) {
            return $this->notFound('Menu item not found.');
        }

        return MenuItemResource::make($menuItem);
    }

    /**
     * Create a menu item for a restaurant.
     *
     * Restaurant Manager who owns the restaurant only.
     */
    public function store(
        StoreMenuItemRequest $request,
        Restaurant $restaurant
    ): MenuItemResource|JsonResponse {
        $this->authorize('create', [MenuItem::class, $restaurant]);

        try {
            $data = $request->validated();

            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image')->store(
                    'menu-items',
                    'public'
                );
            }

            $menuItem = $restaurant->menuItems()->create($data);

            ActivityLogger::menuItemCreated($request);

            return MenuItemResource::make($menuItem->load('restaurant', 'category'))
                ->additional([
                    'message' => 'Menu item created successfully.',
                ])
                ->response()
                ->setStatusCode(201);
        } catch (Exception $e) {
            return $this->error(
                'Unable to create menu item.',
                500,
                config('app.debug') ? $e->getMessage() : null
            );
        }
    }

    /**
     * Update a menu item.
     *
     * Restaurant Manager who owns the menu item's restaurant only.
     */
    public function update(
        UpdateMenuItemRequest $request,
        MenuItem $menuItem
    ): MenuItemResource|JsonResponse {
        $this->authorize('update', $menuItem);

        try {
            $data = $request->validated();

            if ($request->hasFile('image')) {
                if ($menuItem->image) {
                    Storage::disk('public')->delete($menuItem->image);
                }

                $data['image'] = $request->file('image')->store(
                    'menu-items',
                    'public'
                );
            } elseif (
                $request->has('image') &&
                $request->input('image') === null
            ) {
                if ($menuItem->image) {
                    Storage::disk('public')->delete($menuItem->image);
                }

                $data['image'] = null;
            }

            $menuItem->update($data);

            ActivityLogger::menuItemUpdated($request);

            $menuItem->refresh();
            $menuItem->load('restaurant', 'category');

            return MenuItemResource::make($menuItem)
                ->additional([
                    'message' => 'Menu item updated successfully.',
                ]);
        } catch (Exception $e) {
            return $this->error(
                'Unable to update menu item.',
                500,
                config('app.debug') ? $e->getMessage() : null
            );
        }
    }

    /**
     * Delete a menu item.
     *
     * Restaurant Manager who owns the menu item's restaurant only.
     */
    public function destroy(MenuItem $menuItem): JsonResponse
    {
        $this->authorize('delete', $menuItem);

        try {
            $image = $menuItem->image;

            $menuItem->delete();

            if ($image) {
                Storage::disk('public')->delete($image);
            }

            ActivityLogger::menuItemDeleted(request());

            return $this->deleted(
                'Menu item deleted successfully.'
            );
        } catch (Exception $e) {
            return $this->error(
                'Unable to delete menu item.',
                500,
                config('app.debug') ? $e->getMessage() : null
            );
        }
    }
}

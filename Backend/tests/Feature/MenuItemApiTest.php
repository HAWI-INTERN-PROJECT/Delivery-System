<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\MenuItem;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class MenuItemApiTest extends TestCase
{
    use RefreshDatabase;

    private string $endpoint = '/api/v1/menu-items';

    private const MENU_ITEM_FIELDS = [
        'id',
        'restaurant_id',
        'category_id',
        'name',
        'description',
        'price',
        'is_available',
        'image',
        'created_at',
        'updated_at',
    ];

    public function test_public_can_get_available_menu_items(): void
    {
        $restaurant = $this->createApprovedRestaurant();
        $category = $this->createCategory();

        $this->createMenuItem($restaurant, $category, [
            'name' => 'Special Rice',
        ]);

        $response = $this->getJson($this->endpoint);

        $response->assertOk();

        $response->assertJsonFragment([
            'name' => 'Special Rice',
        ]);
    }

    public function test_menu_item_list_excludes_unavailable_items(): void
    {
        $restaurant = $this->createApprovedRestaurant();
        $category = $this->createCategory();

        $this->createMenuItem($restaurant, $category, [
            'name' => 'Available Meal',
            'is_available' => true,
        ]);

        $this->createMenuItem($restaurant, $category, [
            'name' => 'Unavailable Meal',
            'is_available' => false,
        ]);

        $response = $this->getJson($this->endpoint);

        $response->assertOk();

        $response->assertJsonFragment([
            'name' => 'Available Meal',
        ]);

        $response->assertJsonMissing([
            'name' => 'Unavailable Meal',
        ]);
    }

    public function test_menu_item_list_excludes_items_from_non_public_restaurants(): void
    {
        $publicRestaurant = $this->createApprovedRestaurant();

        $nonPublicRestaurant = Restaurant::factory()->create([
            'approval_status' => 'pending',
            'status' => 'inactive',
        ]);

        $category = $this->createCategory();

        $this->createMenuItem($publicRestaurant, $category, [
            'name' => 'Public Meal',
        ]);

        $this->createMenuItem($nonPublicRestaurant, $category, [
            'name' => 'Private Meal',
        ]);

        $response = $this->getJson($this->endpoint);

        $response->assertOk();

        $response->assertJsonFragment([
            'name' => 'Public Meal',
        ]);

        $response->assertJsonMissing([
            'name' => 'Private Meal',
        ]);
    }

    public function test_menu_item_list_returns_expected_fields(): void
    {
        $restaurant = $this->createApprovedRestaurant();
        $category = $this->createCategory();

        $this->createMenuItem($restaurant, $category);

        $response = $this->getJson($this->endpoint);

        $response->assertOk();

        $response->assertJsonStructure([
            'data' => [
                '*' => self::MENU_ITEM_FIELDS,
            ],
        ]);
    }

   public function test_menu_item_list_returns_latest_items_first(): void
{
    $restaurant = $this->createApprovedRestaurant();
    $category = $this->createCategory();

    $olderMenuItem = $this->createMenuItem($restaurant, $category, [
        'name' => 'Older Meal',
        'price' => 100.00,
    ]);

    $olderMenuItem->created_at = now()->subDay();
    $olderMenuItem->saveQuietly();

    $newerMenuItem = $this->createMenuItem($restaurant, $category, [
        'name' => 'Newer Meal',
        'price' => 200.00,
    ]);

    $response = $this->getJson($this->endpoint);

    $response->assertOk();

    $data = $response->json('data');

    $this->assertSame($newerMenuItem->id, $data[0]['id']);
    $this->assertSame($olderMenuItem->id, $data[1]['id']);
}

public function test_public_can_view_available_menu_item(): void
{
    $restaurant = $this->createApprovedRestaurant();
    $category = $this->createCategory();

    $menuItem = $this->createMenuItem($restaurant, $category, [
        'name' => 'Special Rice',
    ]);

    $response = $this->getJson(
        $this->endpoint . '/' . $menuItem->id
    );

    $response->assertOk();

    $response->assertJsonPath(
        'data.id',
        $menuItem->id
    );

    $response->assertJsonPath(
        'data.name',
        'Special Rice'
    );
}

public function test_unavailable_menu_item_is_not_visible(): void
{
    $restaurant = $this->createApprovedRestaurant();
    $category = $this->createCategory();

    $menuItem = $this->createMenuItem($restaurant, $category, [
        'name' => 'Unavailable Meal',
        'is_available' => false,
    ]);

    $response = $this->getJson(
        $this->endpoint . '/' . $menuItem->id
    );

    $response->assertNotFound();

    $response->assertJsonPath(
        'message',
        'Menu item not found.'
    );
}

public function test_menu_item_from_non_public_restaurant_is_not_visible(): void
{
    $restaurant = Restaurant::factory()->create([
        'approval_status' => 'pending',
        'status' => 'inactive',
    ]);

    $category = $this->createCategory();

    $menuItem = $this->createMenuItem($restaurant, $category, [
        'name' => 'Private Meal',
    ]);

    $response = $this->getJson(
        $this->endpoint . '/' . $menuItem->id
    );

    $response->assertNotFound();

    $response->assertJsonPath(
        'message',
        'Menu item not found.'
    );
}

public function test_nonexistent_menu_item_returns_not_found(): void
{
    $response = $this->getJson(
        $this->endpoint . '/999999'
    );

    $response->assertNotFound();
}

public function test_menu_item_show_returns_expected_fields(): void
{
    $restaurant = $this->createApprovedRestaurant();
    $category = $this->createCategory();

    $menuItem = $this->createMenuItem($restaurant, $category);

    $response = $this->getJson(
        $this->endpoint . '/' . $menuItem->id
    );

    $response->assertOk();

    $response->assertJsonStructure([
        'data' => self::MENU_ITEM_FIELDS,
    ]);
}

public function test_owner_manager_can_create_menu_item(): void
{
    $manager = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $restaurant = Restaurant::factory()->create([
        'manager_id' => $manager->id,
    ]);

    $category = $this->createCategory();

    $response = $this->actingAs($manager, 'sanctum')
        ->postJson(
            "/api/v1/restaurants/{$restaurant->id}/menu-items",
            [
                'category_id' => $category->id,
                'name' => 'Special Rice',
                'description' => 'Delicious rice',
                'price' => 150.00,
                'is_available' => true,
            ]
        );

    $response->assertCreated();

    $response->assertJsonStructure([
        'data' => self::MENU_ITEM_FIELDS,
    ]);

    $this->assertDatabaseHas('menu_items', [
        'restaurant_id' => $restaurant->id,
        'category_id' => $category->id,
        'name' => 'Special Rice',
        'price' => '150.00',
        'is_available' => true,
    ]);
}

public function test_other_manager_cannot_create_menu_item_for_another_restaurant(): void
{
    $owner = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $otherManager = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $restaurant = Restaurant::factory()->create([
        'manager_id' => $owner->id,
    ]);

    $category = $this->createCategory();

    $response = $this->actingAs($otherManager, 'sanctum')
        ->postJson(
            "/api/v1/restaurants/{$restaurant->id}/menu-items",
            [
                'category_id' => $category->id,
                'name' => 'Unauthorized Meal',
                'price' => 200.00,
                'is_available' => true,
            ]
        );

    $response->assertForbidden();

    $this->assertDatabaseMissing('menu_items', [
        'restaurant_id' => $restaurant->id,
        'name' => 'Unauthorized Meal',
    ]);
}

public function test_customer_cannot_create_menu_item(): void
{
    $customer = User::factory()->create([
        'role' => 'customer',
    ]);

    $restaurant = Restaurant::factory()->create();
    $category = $this->createCategory();

    $response = $this->actingAs($customer, 'sanctum')
        ->postJson(
            "/api/v1/restaurants/{$restaurant->id}/menu-items",
            [
                'category_id' => $category->id,
                'name' => 'Unauthorized Meal',
                'price' => 200.00,
            ]
        );

    $response->assertForbidden();

    $this->assertDatabaseMissing('menu_items', [
        'name' => 'Unauthorized Meal',
    ]);
}

public function test_guest_cannot_create_menu_item(): void
{
    $restaurant = Restaurant::factory()->create();
    $category = $this->createCategory();

    $response = $this->postJson(
        "/api/v1/restaurants/{$restaurant->id}/menu-items",
        [
            'category_id' => $category->id,
            'name' => 'Unauthorized Meal',
            'price' => 200.00,
        ]
    );

    $response->assertUnauthorized();
}

public function test_menu_item_creation_validates_input(): void
{
    $manager = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $restaurant = Restaurant::factory()->create([
        'manager_id' => $manager->id,
    ]);

    $response = $this->actingAs($manager, 'sanctum')
        ->postJson(
            "/api/v1/restaurants/{$restaurant->id}/menu-items",
            [
                'category_id' => 999999,
                'name' => '',
                'description' => str_repeat('a', 2001),
                'price' => 0,
                'is_available' => 'invalid',
            ]
        );

    $response->assertUnprocessable();

    $response->assertJsonValidationErrors([
        'category_id',
        'name',
        'description',
        'price',
        'is_available',
    ]);

    $this->assertDatabaseCount('menu_items', 0);
}

public function test_menu_item_price_must_be_greater_than_zero(): void
{
    $manager = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $restaurant = Restaurant::factory()->create([
        'manager_id' => $manager->id,
    ]);

    $category = $this->createCategory();

    $response = $this->actingAs($manager, 'sanctum')
        ->postJson(
            "/api/v1/restaurants/{$restaurant->id}/menu-items",
            [
                'category_id' => $category->id,
                'name' => 'Invalid Price Meal',
                'price' => 0,
            ]
        );

    $response->assertUnprocessable();

    $response->assertJsonValidationErrors([
        'price',
    ]);

    $this->assertDatabaseMissing('menu_items', [
        'name' => 'Invalid Price Meal',
    ]);
}

public function test_restaurant_id_cannot_be_overridden_during_creation(): void
{
    $manager = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $restaurant = Restaurant::factory()->create([
        'manager_id' => $manager->id,
    ]);

    $otherRestaurant = Restaurant::factory()->create();

    $category = $this->createCategory();

    $response = $this->actingAs($manager, 'sanctum')
        ->postJson(
            "/api/v1/restaurants/{$restaurant->id}/menu-items",
            [
                'restaurant_id' => $otherRestaurant->id,
                'category_id' => $category->id,
                'name' => 'Protected Restaurant Meal',
                'price' => 175.00,
            ]
        );

    $response->assertCreated();

    $this->assertDatabaseHas('menu_items', [
        'restaurant_id' => $restaurant->id,
        'name' => 'Protected Restaurant Meal',
    ]);

    $this->assertDatabaseMissing('menu_items', [
        'restaurant_id' => $otherRestaurant->id,
        'name' => 'Protected Restaurant Meal',
    ]);
}

public function test_manager_can_create_menu_item_with_image(): void
{
    Storage::fake('public');

    $manager = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $restaurant = Restaurant::factory()->create([
        'manager_id' => $manager->id,
    ]);

    $category = $this->createCategory();

    $image = UploadedFile::fake()->image('menu-item.jpg');

    $response = $this->actingAs($manager, 'sanctum')
        ->post(
            "/api/v1/restaurants/{$restaurant->id}/menu-items",
            [
                'category_id' => $category->id,
                'name' => 'Image Meal',
                'price' => 250.00,
                'image' => $image,
            ]
        );

    $response->assertCreated();

    $menuItem = MenuItem::where('name', 'Image Meal')->firstOrFail();

    $this->assertNotNull($menuItem->image);

    Storage::disk('public')->assertExists($menuItem->image);
}

public function test_owner_manager_can_update_menu_item(): void
{
    $manager = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $restaurant = Restaurant::factory()->create([
        'manager_id' => $manager->id,
    ]);

    $category = $this->createCategory();
    $menuItem = $this->createMenuItem($restaurant, $category, [
        'name' => 'Old Meal',
        'price' => 100.00,
    ]);

    $response = $this->actingAs($manager, 'sanctum')
        ->putJson(
            $this->endpoint . '/' . $menuItem->id,
            [
                'name' => 'Updated Meal',
                'price' => 175.00,
                'description' => 'Updated description',
                'is_available' => false,
            ]
        );

    $response->assertOk();

    $response->assertJsonStructure([
        'data' => self::MENU_ITEM_FIELDS,
    ]);

    $this->assertDatabaseHas('menu_items', [
        'id' => $menuItem->id,
        'name' => 'Updated Meal',
        'description' => 'Updated description',
        'price' => '175.00',
        'is_available' => false,
    ]);
}

public function test_other_manager_cannot_update_menu_item(): void
{
    $owner = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $otherManager = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $restaurant = Restaurant::factory()->create([
        'manager_id' => $owner->id,
    ]);

    $category = $this->createCategory();

    $menuItem = $this->createMenuItem($restaurant, $category, [
        'name' => 'Original Meal',
    ]);

    $response = $this->actingAs($otherManager, 'sanctum')
        ->putJson(
            $this->endpoint . '/' . $menuItem->id,
            [
                'name' => 'Hacked Meal',
            ]
        );

    $response->assertForbidden();

    $this->assertDatabaseHas('menu_items', [
        'id' => $menuItem->id,
        'name' => 'Original Meal',
    ]);
}

public function test_customer_cannot_update_menu_item(): void
{
    $customer = User::factory()->create([
        'role' => 'customer',
    ]);

    $restaurant = Restaurant::factory()->create();
    $category = $this->createCategory();

    $menuItem = $this->createMenuItem($restaurant, $category, [
        'name' => 'Original Meal',
    ]);

    $response = $this->actingAs($customer, 'sanctum')
        ->putJson(
            $this->endpoint . '/' . $menuItem->id,
            [
                'name' => 'Unauthorized Meal',
            ]
        );

    $response->assertForbidden();

    $this->assertDatabaseHas('menu_items', [
        'id' => $menuItem->id,
        'name' => 'Original Meal',
    ]);
}

public function test_guest_cannot_update_menu_item(): void
{
    $restaurant = Restaurant::factory()->create();
    $category = $this->createCategory();

    $menuItem = $this->createMenuItem($restaurant, $category);

    $response = $this->putJson(
        $this->endpoint . '/' . $menuItem->id,
        [
            'name' => 'Unauthorized Meal',
        ]
    );

    $response->assertUnauthorized();
}

public function test_menu_item_can_be_partially_updated(): void
{
    $manager = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $restaurant = Restaurant::factory()->create([
        'manager_id' => $manager->id,
    ]);

    $category = $this->createCategory();

    $menuItem = $this->createMenuItem($restaurant, $category, [
        'name' => 'Original Meal',
        'description' => 'Original description',
        'price' => 100.00,
        'is_available' => true,
    ]);

    $response = $this->actingAs($manager, 'sanctum')
        ->putJson(
            $this->endpoint . '/' . $menuItem->id,
            [
                'price' => 125.00,
            ]
        );

    $response->assertOk();

    $this->assertDatabaseHas('menu_items', [
        'id' => $menuItem->id,
        'name' => 'Original Meal',
        'description' => 'Original description',
        'price' => '125.00',
        'is_available' => true,
    ]);
}

public function test_menu_item_update_validates_input(): void
{
    $manager = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $restaurant = Restaurant::factory()->create([
        'manager_id' => $manager->id,
    ]);

    $category = $this->createCategory();

    $menuItem = $this->createMenuItem($restaurant, $category, [
        'name' => 'Original Meal',
        'price' => 150.00,
    ]);

    $response = $this->actingAs($manager, 'sanctum')
        ->putJson(
            $this->endpoint . '/' . $menuItem->id,
            [
                'category_id' => 999999,
                'name' => '',
                'description' => str_repeat('a', 2001),
                'price' => 0,
                'is_available' => 'invalid',
            ]
        );

    $response->assertUnprocessable();

    $response->assertJsonValidationErrors([
        'category_id',
        'name',
        'description',
        'price',
        'is_available',
    ]);

    $this->assertDatabaseHas('menu_items', [
        'id' => $menuItem->id,
        'name' => 'Original Meal',
        'price' => '150.00',
    ]);
}

public function test_restaurant_id_cannot_be_changed_during_update(): void
{
    $manager = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $restaurant = Restaurant::factory()->create([
        'manager_id' => $manager->id,
    ]);

    $otherRestaurant = Restaurant::factory()->create();

    $category = $this->createCategory();

    $menuItem = $this->createMenuItem($restaurant, $category, [
        'name' => 'Protected Meal',
    ]);

    $response = $this->actingAs($manager, 'sanctum')
        ->putJson(
            $this->endpoint . '/' . $menuItem->id,
            [
                'restaurant_id' => $otherRestaurant->id,
                'name' => 'Updated Protected Meal',
            ]
        );

    $response->assertOk();

    $this->assertDatabaseHas('menu_items', [
        'id' => $menuItem->id,
        'restaurant_id' => $restaurant->id,
        'name' => 'Updated Protected Meal',
    ]);
}

public function test_manager_can_replace_menu_item_image(): void
{
    Storage::fake('public');

    $manager = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $restaurant = Restaurant::factory()->create([
        'manager_id' => $manager->id,
    ]);

    $category = $this->createCategory();

    Storage::disk('public')->put(
        'menu-items/old-image.jpg',
        'old image'
    );

    $menuItem = $this->createMenuItem($restaurant, $category, [
        'name' => 'Image Meal',
        'image' => 'menu-items/old-image.jpg',
    ]);

    $newImage = UploadedFile::fake()->create(
        'new-image.jpg',
        100,
        'image/jpeg'
    );

    $response = $this->actingAs($manager, 'sanctum')
        ->put(
            $this->endpoint . '/' . $menuItem->id,
            [
                'image' => $newImage,
            ]
        );

    $response->assertOk();

    $menuItem->refresh();

    $this->assertNotNull($menuItem->image);

    Storage::disk('public')->assertMissing(
        'menu-items/old-image.jpg'
    );

    Storage::disk('public')->assertExists(
        $menuItem->image
    );
}

public function test_manager_can_remove_menu_item_image(): void
{
    Storage::fake('public');

    $manager = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $restaurant = Restaurant::factory()->create([
        'manager_id' => $manager->id,
    ]);

    $category = $this->createCategory();

    Storage::disk('public')->put(
        'menu-items/menu-image.jpg',
        'menu image'
    );

    $menuItem = $this->createMenuItem($restaurant, $category, [
        'name' => 'Removable Image Meal',
        'image' => 'menu-items/menu-image.jpg',
    ]);

    $response = $this->actingAs($manager, 'sanctum')
        ->put(
            $this->endpoint . '/' . $menuItem->id,
            [
                'image' => null,
            ]
        );

    $response->assertOk();

    $menuItem->refresh();

    $this->assertNull($menuItem->image);

    Storage::disk('public')->assertMissing(
        'menu-items/menu-image.jpg'
    );
}

public function test_owner_manager_can_delete_menu_item(): void
{
    $manager = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $restaurant = Restaurant::factory()->create([
        'manager_id' => $manager->id,
    ]);

    $category = $this->createCategory();

    $menuItem = $this->createMenuItem($restaurant, $category, [
        'name' => 'Meal To Delete',
    ]);

    $response = $this->actingAs($manager, 'sanctum')
        ->deleteJson(
            $this->endpoint . '/' . $menuItem->id
        );

    $response->assertOk();

    $this->assertDatabaseMissing('menu_items', [
        'id' => $menuItem->id,
    ]);
}

public function test_other_manager_cannot_delete_menu_item(): void
{
    $owner = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $otherManager = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $restaurant = Restaurant::factory()->create([
        'manager_id' => $owner->id,
    ]);

    $category = $this->createCategory();

    $menuItem = $this->createMenuItem($restaurant, $category, [
        'name' => 'Protected Meal',
    ]);

    $response = $this->actingAs($otherManager, 'sanctum')
        ->deleteJson(
            $this->endpoint . '/' . $menuItem->id
        );

    $response->assertForbidden();

    $this->assertDatabaseHas('menu_items', [
        'id' => $menuItem->id,
        'name' => 'Protected Meal',
    ]);
}

public function test_customer_cannot_delete_menu_item(): void
{
    $customer = User::factory()->create([
        'role' => 'customer',
    ]);

    $restaurant = Restaurant::factory()->create();
    $category = $this->createCategory();

    $menuItem = $this->createMenuItem($restaurant, $category, [
        'name' => 'Protected Meal',
    ]);

    $response = $this->actingAs($customer, 'sanctum')
        ->deleteJson(
            $this->endpoint . '/' . $menuItem->id
        );

    $response->assertForbidden();

    $this->assertDatabaseHas('menu_items', [
        'id' => $menuItem->id,
    ]);
}

public function test_guest_cannot_delete_menu_item(): void
{
    $restaurant = Restaurant::factory()->create();
    $category = $this->createCategory();

    $menuItem = $this->createMenuItem($restaurant, $category);

    $response = $this->deleteJson(
        $this->endpoint . '/' . $menuItem->id
    );

    $response->assertUnauthorized();

    $this->assertDatabaseHas('menu_items', [
        'id' => $menuItem->id,
    ]);
}

public function test_manager_can_delete_menu_item_image(): void
{
    Storage::fake('public');

    $manager = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $restaurant = Restaurant::factory()->create([
        'manager_id' => $manager->id,
    ]);

    $category = $this->createCategory();

    Storage::disk('public')->put(
        'menu-items/delete-image.jpg',
        'menu item image'
    );

    $menuItem = $this->createMenuItem($restaurant, $category, [
        'name' => 'Image Meal',
        'image' => 'menu-items/delete-image.jpg',
    ]);

    $response = $this->actingAs($manager, 'sanctum')
        ->deleteJson(
            $this->endpoint . '/' . $menuItem->id
        );

    $response->assertOk();

    $this->assertDatabaseMissing('menu_items', [
        'id' => $menuItem->id,
    ]);

    Storage::disk('public')->assertMissing(
        'menu-items/delete-image.jpg'
    );
}

public function test_nonexistent_menu_item_cannot_be_deleted(): void
{
    $manager = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $response = $this->actingAs($manager, 'sanctum')
        ->deleteJson(
            $this->endpoint . '/999999'
        );

    $response->assertNotFound();
}

public function test_delete_menu_item_returns_expected_message(): void
{
    $manager = User::factory()->create([
        'role' => 'restaurant_manager',
    ]);

    $restaurant = Restaurant::factory()->create([
        'manager_id' => $manager->id,
    ]);

    $category = $this->createCategory();

    $menuItem = $this->createMenuItem($restaurant, $category);

    $response = $this->actingAs($manager, 'sanctum')
        ->deleteJson(
            $this->endpoint . '/' . $menuItem->id
        );

    $response->assertOk()
        ->assertJsonPath(
            'message',
            'Menu item deleted successfully.'
        );
}

    private function createApprovedRestaurant(): Restaurant
    {
        return Restaurant::factory()->create([
            'approval_status' => 'approved',
            'status' => 'active',
        ]);
    }

    private function createCategory(string $name = 'Main Food'): Category
    {
        return Category::create([
            'name' => $name,
        ]);
    }

    private function createMenuItem(
        Restaurant $restaurant,
        Category $category,
        array $attributes = []
    ): MenuItem {
        return $restaurant->menuItems()->create(array_merge([
            'category_id' => $category->id,
            'name' => 'Special Rice',
            'description' => 'Delicious rice',
            'price' => 150.00,
            'is_available' => true,
            'image' => null,
        ], $attributes));
    }
}

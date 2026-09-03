<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class RoleMiddlewareTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Route::middleware(['auth:sanctum', 'role:restaurant_manager,driver'])
            ->get('/api/v1/test-role', fn () => response()->json([
                'message' => 'Access granted',
            ]));
    }

    public function test_user_with_allowed_role_can_access_route(): void
    {
        $user = User::factory()->create([
            'role' => 'restaurant_manager',
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/v1/test-role');

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Access granted',
            ]);
    }

    public function test_user_with_wrong_role_is_forbidden(): void
    {
        $user = User::factory()->create([
            'role' => 'customer',
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/v1/test-role');

        $response->assertStatus(403)
            ->assertJson([
                'success' => false,
                'message' => 'You do not have permission to access this resource.',
            ]);
    }

    public function test_admin_is_forbidden_when_role_is_not_allowed(): void
    {
        $user = User::factory()->create([
            'role' => 'admin',
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/v1/test-role');

        $response->assertStatus(403)
            ->assertJson([
                'success' => false,
                'message' => 'You do not have permission to access this resource.',
            ]);
    }

    public function test_route_accepts_multiple_allowed_roles(): void
    {
        $user = User::factory()->create([
            'role' => 'driver',
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/v1/test-role');

        $response->assertOk();
    }

    public function test_unauthenticated_user_is_unauthorized(): void
    {
        $response = $this->getJson('/api/v1/test-role');

        $response->assertStatus(401);
    }
}

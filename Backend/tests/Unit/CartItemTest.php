<?php

namespace Tests\Unit;

use App\Models\CartItem;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Tests\TestCase;

class CartItemTest extends TestCase
{
    public function test_cart_item_has_fillable_attributes(): void
    {
        $this->assertEquals([
            'customer_id',
            'menu_item_id',
            'quantity',
        ], (new CartItem())->getFillable());
    }

    public function test_cart_item_has_correct_casts(): void
    {
        $this->assertEquals(
            'integer',
            (new CartItem())->getCasts()['quantity']
        );
    }

    public function test_cart_item_belongs_to_customer(): void
    {
        $this->assertInstanceOf(
            BelongsTo::class,
            (new CartItem())->customer()
        );
    }

    public function test_cart_item_belongs_to_menu_item(): void
    {
        $this->assertInstanceOf(
            BelongsTo::class,
            (new CartItem())->menuItem()
        );
    }
}
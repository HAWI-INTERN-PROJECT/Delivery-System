<?php

namespace Tests\Unit;

use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Tests\TestCase;

class OrderItemTest extends TestCase
{
    public function test_order_item_has_fillable_attributes(): void
    {
        $this->assertEquals([
            'quantity',
        ], (new OrderItem())->getFillable());
    }

    public function test_order_item_has_correct_casts(): void
    {
        $model = new OrderItem();

        $this->assertEquals('integer', $model->getCasts()['quantity']);
        $this->assertEquals('decimal:2', $model->getCasts()['unit_price']);
        $this->assertEquals('decimal:2', $model->getCasts()['subtotal']);
    }

    public function test_order_item_belongs_to_order(): void
    {
        $this->assertInstanceOf(
            BelongsTo::class,
            (new OrderItem())->order()
        );
    }

    public function test_order_item_belongs_to_menu_item(): void
    {
        $this->assertInstanceOf(
            BelongsTo::class,
            (new OrderItem())->menuItem()
        );
    }

    public function test_order_item_has_one_rating(): void
    {
        $this->assertInstanceOf(
            HasOne::class,
            (new OrderItem())->rating()
        );
    }
}
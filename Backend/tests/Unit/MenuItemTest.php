<?php

namespace Tests\Unit;

use App\Models\MenuItem;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Tests\TestCase;

class MenuItemTest extends TestCase
{
    public function test_menu_item_has_fillable_attributes(): void
    {
        $model = new MenuItem();

        $this->assertEquals([
            'restaurant_id',
            'category_id',
            'name',
            'description',
            'price',
            'is_available',
            'image',
        ], $model->getFillable());
    }

    public function test_menu_item_has_correct_casts(): void
    {
        $model = new MenuItem();

        $this->assertEquals('decimal:2', $model->getCasts()['price']);
        $this->assertEquals('boolean', $model->getCasts()['is_available']);
    }

    public function test_menu_item_belongs_to_restaurant(): void
    {
        $this->assertInstanceOf(
            BelongsTo::class,
            (new MenuItem())->restaurant()
        );
    }

    public function test_menu_item_belongs_to_category(): void
    {
        $this->assertInstanceOf(
            BelongsTo::class,
            (new MenuItem())->category()
        );
    }

    public function test_menu_item_has_many_cart_items(): void
    {
        $this->assertInstanceOf(
            HasMany::class,
            (new MenuItem())->cartItems()
        );
    }

    public function test_menu_item_has_many_order_items(): void
    {
        $this->assertInstanceOf(
            HasMany::class,
            (new MenuItem())->orderItems()
        );
    }

    public function test_menu_item_has_many_ratings(): void
    {
        $this->assertInstanceOf(
            HasMany::class,
            (new MenuItem())->ratings()
        );
    }
}
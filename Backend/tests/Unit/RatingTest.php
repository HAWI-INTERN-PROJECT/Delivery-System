<?php

namespace Tests\Unit;

use App\Models\Rating;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Tests\TestCase;

class RatingTest extends TestCase
{
    public function test_rating_has_fillable_attributes(): void
    {
        $this->assertEquals([
            'customer_id',
            'menu_item_id',
            'order_item_id',
            'rating',
            'comment',
        ], (new Rating())->getFillable());
    }

    public function test_rating_casts_rating_to_integer(): void
    {
        $this->assertEquals(
            'integer',
            (new Rating())->getCasts()['rating']
        );
    }

    public function test_rating_belongs_to_customer(): void
    {
        $this->assertInstanceOf(BelongsTo::class, (new Rating())->customer());
    }

    public function test_rating_belongs_to_menu_item(): void
    {
        $this->assertInstanceOf(BelongsTo::class, (new Rating())->menuItem());
    }

    public function test_rating_belongs_to_order_item(): void
    {
        $this->assertInstanceOf(BelongsTo::class, (new Rating())->orderItem());
    }
}
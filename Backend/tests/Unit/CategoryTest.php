<?php

namespace Tests\Unit;

use App\Models\Category;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    public function test_category_has_fillable_attributes(): void
    {
        $model = new Category();

        $this->assertEquals([
            'name',
            'description',
        ], $model->getFillable());
    }

    public function test_category_has_many_menu_items(): void
    {
        $model = new Category();

        $this->assertInstanceOf(
            HasMany::class,
            $model->menuItems()
        );
    }
}
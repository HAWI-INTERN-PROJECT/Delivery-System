<?php

namespace Tests\Unit;

use App\Models\DriverLocation;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Tests\TestCase;

class DriverLocationTest extends TestCase
{
    public function test_driver_location_has_fillable_attributes(): void
    {
        $model = new DriverLocation();

        $this->assertEquals([
            'driver_profile_id',
            'latitude',
            'longitude',
            'recorded_at',
        ], $model->getFillable());
    }

    public function test_driver_location_has_correct_casts(): void
    {
        $model = new DriverLocation();

        $this->assertEquals('decimal:7', $model->getCasts()['latitude']);
        $this->assertEquals('decimal:7', $model->getCasts()['longitude']);
        $this->assertEquals('datetime', $model->getCasts()['recorded_at']);
    }

    public function test_driver_location_belongs_to_driver_profile(): void
    {
        $model = new DriverLocation();

        $this->assertInstanceOf(
            BelongsTo::class,
            $model->driverProfile()
        );
    }
}
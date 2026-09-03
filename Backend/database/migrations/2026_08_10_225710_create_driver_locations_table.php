<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('driver_locations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('driver_profile_id')
                ->constrained('driver_profiles')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->decimal('latitude', 10, 7);

            $table->decimal('longitude', 10, 7);

            $table->timestamp('recorded_at');

            $table->timestamps();

            $table->index([
                'driver_profile_id',
                'recorded_at'
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('driver_locations');
    }
};
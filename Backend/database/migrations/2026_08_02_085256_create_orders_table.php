<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->foreignId('customer_id')
                ->constrained('users')
                ->restrictOnDelete()
                ->cascadeOnUpdate();

            $table->foreignId('restaurant_id')
                ->constrained('restaurants')
                ->restrictOnDelete()
                ->cascadeOnUpdate();

            $table->foreignId('driver_id')
    ->nullable()
    ->constrained('driver_profiles')
    ->nullOnDelete()
    ->cascadeOnUpdate();

            $table->decimal('subtotal', 10, 2);

            $table->decimal('delivery_fee', 10, 2)
                ->default(0.00);

            $table->decimal('total_amount', 10, 2);

            $table->text('delivery_address');

            $table->string('phone', 20);

            $table->enum('status', [
                'pending',
                'preparing',
                'ready_for_pickup',
                'in_transit',
                'delivered',
                'cancelled',
                'rejected'
            ])->default('pending');

            $table->timestamp('assigned_at')
                ->nullable();

            $table->timestamp('delivered_at')
    ->nullable();

$table->index('status');

$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
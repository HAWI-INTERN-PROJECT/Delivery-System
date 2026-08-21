<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();

            $table->foreignId('customer_id')
                ->constrained('users')
                ->restrictOnDelete()
                ->cascadeOnUpdate();

            $table->foreignId('menu_item_id')
                ->constrained('menu_items')
                ->restrictOnDelete()
                ->cascadeOnUpdate();

            $table->foreignId('order_item_id')
                ->unique()
                ->constrained('order_items')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->unsignedTinyInteger('rating');

            $table->text('comment')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ratings');
    }
};
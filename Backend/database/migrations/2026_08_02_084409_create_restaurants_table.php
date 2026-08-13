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
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();

            $table->foreignId('manager_id')
                ->constrained('users')
                ->restrictOnDelete()
                ->cascadeOnUpdate();

            $table->string('name', 255);

            $table->text('description')
                ->nullable();

            $table->text('address');

            $table->string('phone', 20);

            $table->string('logo', 255)
                ->nullable();

            $table->enum('approval_status', [
                'pending',
                'approved',
                'rejected'
            ])->default('pending');

            $table->enum('status', [
    'active',
    'inactive',
    'suspended'
])->default('inactive');

$table->index('approval_status');
$table->index('status');

$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurants');
    }
};
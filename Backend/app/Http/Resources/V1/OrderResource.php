<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property-read int $id
 * @property-read string $status
 * @property-read float $total_amount
 * @property-read \Carbon\Carbon|null $created_at
 * @property-read \App\Models\User|null $customer
 * @property-read \App\Models\Restaurant|null $restaurant
 */
class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'orderNumber' => sprintf('#ORD-%04d', $this->id),
            'customer' => [
                'id' => $this->customer?->id,
                'name' => $this->customer?->name ?? 'Unknown Customer',
            ],
            'restaurant' => [
                'id' => $this->restaurant?->id,
                'name' => $this->restaurant?->name ?? 'Unknown Restaurant',
            ],
            'status' => $this->status,
            'totalAmount' => (float) $this->total_amount,
            'createdAt' => $this->created_at?->toIso8601String(),
        ];
    }
}

<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\OrderResource;
use App\Http\Traits\ApiResponse;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    use ApiResponse;

    /**
     * List orders with stats, optional status filter, and search.
     */
    public function index(Request $request): JsonResponse
    {
        $status = $request->query('status');
        $search = trim((string) $request->query('search', ''));

        $ordersQuery = Order::query()
            ->with([
                'customer:id,name',
                'restaurant:id,name',
            ])
            ->latest();

        if ($status && $status !== 'all') {
            $ordersQuery->where('status', $status);
        }

        if ($search !== '') {
            $ordersQuery->where(function ($query) use ($search): void {
                $query->where('id', 'like', '%'.$search.'%')
                    ->orWhereHas('customer', function ($customerQuery) use ($search): void {
                        $customerQuery->where('name', 'like', '%'.$search.'%');
                    })
                    ->orWhereHas('restaurant', function ($restaurantQuery) use ($search): void {
                        $restaurantQuery->where('name', 'like', '%'.$search.'%');
                    });

                if (preg_match('/#?ORD-(\d+)/i', $search, $matches)) {
                    $query->orWhere('id', (int) $matches[1]);
                }
            });
        }

        $orders = $ordersQuery->limit(100)->get();

        $todayCounts = Order::query()
            ->whereDate('created_at', today())
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');

        $stats = [
            'totalToday' => (int) $todayCounts->sum(),
            'pending' => (int) ($todayCounts['pending'] ?? 0),
            'preparing' => (int) ($todayCounts['preparing'] ?? 0),
            'delivered' => (int) ($todayCounts['delivered'] ?? 0),
            'rejected' => (int) (($todayCounts['rejected'] ?? 0) + ($todayCounts['cancelled'] ?? 0)),
        ];

        return $this->success([
            'stats' => $stats,
            'orders' => OrderResource::collection($orders)->resolve(),
        ]);
    }
}

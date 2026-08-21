<?php

namespace Tests\Unit;

use App\Models\Payment;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Tests\TestCase;

class PaymentTest extends TestCase
{
    public function test_payment_has_fillable_attributes(): void
    {
        $this->assertEquals([
            'order_id',
            'payment_method',
            'transaction_reference',
            'amount',
            'status',
            'paid_at',
        ], (new Payment())->getFillable());
    }

    public function test_payment_has_correct_casts(): void
    {
        $model = new Payment();

        $this->assertEquals('decimal:2', $model->getCasts()['amount']);
        $this->assertEquals('datetime', $model->getCasts()['paid_at']);
    }

    public function test_payment_belongs_to_order(): void
    {
        $this->assertInstanceOf(
            BelongsTo::class,
            (new Payment())->order()
        );
    }
}
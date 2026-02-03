const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_1DP5MMOk9HrDPG',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'test_secret_key',
});

// Create Razorpay order
exports.createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        console.log('[Payment Controller] Creating order with amount:', amount);

        if (!amount || amount <= 0) {
            console.error('[Payment Controller] Invalid amount:', amount);
            return res.status(400).json({ error: 'Invalid amount' });
        }

        const order = await razorpay.orders.create({
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            receipt: `booking_${Date.now()}`,
            notes: {
                description: 'Booking payment for Dora Explorer',
            },
        });

        console.log('[Payment Controller] Order created successfully:', order.id);

        res.json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        console.error('[Payment Controller] Error creating order:', error.message);
        res.status(500).json({ error: 'Failed to create order', details: error.message });
    }
};

// Verify payment signature
exports.verifyPayment = async (req, res) => {
    try {
        const { orderId, paymentId, signature } = req.body;

        console.log('[Payment Controller] Verifying payment:', { orderId, paymentId });

        if (!orderId || !paymentId || !signature) {
            console.error('[Payment Controller] Missing payment details');
            return res.status(400).json({ error: 'Missing payment details' });
        }

        // Generate signature
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'test_secret_key')
            .update(`${orderId}|${paymentId}`)
            .digest('hex');

        console.log('[Payment Controller] Signature comparison:');
        console.log('  Generated:', generated_signature);
        console.log('  Received:', signature);

        const isSignatureValid = generated_signature === signature;

        if (isSignatureValid) {
            // Payment is verified, update booking status
            console.log('[Payment Controller] Payment verified successfully');
            res.json({
                verified: true,
                message: 'Payment verified successfully',
                paymentId,
                orderId,
            });
        } else {
            console.error('[Payment Controller] Signature mismatch - payment verification failed');
            res.status(400).json({
                verified: false,
                message: 'Payment verification failed - Signature mismatch',
            });
        }
    } catch (error) {
        console.error('[Payment Controller] Error verifying payment:', error.message);
        res.status(500).json({ error: 'Failed to verify payment', details: error.message });
    }
};

// Get payment details
exports.getPaymentDetails = async (req, res) => {
    try {
        const { paymentId } = req.params;

        if (!paymentId) {
            return res.status(400).json({ error: 'Payment ID is required' });
        }

        const payment = await razorpay.payments.fetch(paymentId);

        res.json({
            success: true,
            payment: {
                id: payment.id,
                amount: payment.amount / 100,
                currency: payment.currency,
                status: payment.status,
                method: payment.method,
                email: payment.email,
                contact: payment.contact,
                created_at: payment.created_at,
            },
        });
    } catch (error) {
        console.error('Error fetching payment details:', error);
        res.status(500).json({ error: 'Failed to fetch payment details', details: error.message });
    }
};

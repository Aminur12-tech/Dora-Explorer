# Razorpay Payment Integration Guide

## Setup Instructions

### 1. Frontend Setup (React)

#### Environment Variables
Add the following to your `.env.local` file:

```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Get your Key ID from [Razorpay Dashboard](https://dashboard.razorpay.com):
1. Go to Settings > API Keys
2. Copy your Key ID (starts with `rzp_live_` or `rzp_test_`)

#### Install Dependencies
```bash
cd guwahati-go
npm install razorpay
npm install
```

### 2. Backend Setup (Node.js)

#### Environment Variables
Add the following to your `.env` file in the backend:

```env
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Get your Key Secret from [Razorpay Dashboard](https://dashboard.razorpay.com):
1. Go to Settings > API Keys
2. Copy your Key Secret (keep this private!)

#### Install Dependencies
```bash
npm install razorpay
npm install
```

### 3. Payment Flow

1. **User Books Experience**
   - User selects experience and time slot
   - User is taken to booking confirmation page

2. **Payment Initiation**
   - Click "Pay ₹{amount}" button
   - Backend creates Razorpay order

3. **Payment Processing**
   - Razorpay payment modal opens
   - User enters payment details
   - Payment is processed

4. **Verification & Confirmation**
   - Backend verifies payment signature
   - Booking is confirmed
   - User is redirected to bookings page

### 4. Test Credentials

For testing with Razorpay sandbox:

**Test Cards:**
- **Success**: 4111 1111 1111 1111
- **Failure**: 4000 0000 0000 0010

**CVV/OTP**: Any 3-digit number
**Expiry**: Any future date

### 5. API Endpoints

#### Create Order
```
POST /api/payment/create-order
Body: { amount: 500 }
Response: { success: true, orderId: "order_123...", amount: 50000, currency: "INR" }
```

#### Verify Payment
```
POST /api/payment/verify
Body: { orderId: "order_...", paymentId: "pay_...", signature: "sig_..." }
Response: { verified: true, message: "Payment verified successfully" }
```

#### Get Payment Details
```
GET /api/payment/:paymentId
Response: { success: true, payment: { id, amount, status, ... } }
```

### 6. Security Notes

⚠️ **Important:**
- Never expose `RAZORPAY_KEY_SECRET` in frontend code
- Always verify payment signatures on the backend
- Store payment information securely in database
- Use HTTPS in production

### 7. Troubleshooting

**Issue**: "Razorpay is not available"
- **Solution**: Ensure Razorpay script is loaded. Check browser console for errors.

**Issue**: "Payment verification failed"
- **Solution**: Verify that `RAZORPAY_KEY_SECRET` is correct in backend.

**Issue**: CORS errors
- **Solution**: Ensure CORS is properly configured in backend for payment requests.

### 8. File Structure

Frontend:
```
src/
  utils/
    razorpay.ts          # Razorpay utilities
  pages/
    BookingConfirmation.tsx  # Payment integration
```

Backend:
```
src/
  controllers/
    payment.js           # Payment endpoints logic
  routes/
    payment.routes.js    # Payment API routes
```

### 9. Next Steps

1. Set up Razorpay account at [razorpay.com](https://razorpay.com)
2. Add API keys to environment variables
3. Test with provided test cards
4. Monitor payments in Razorpay dashboard
5. Deploy to production when ready

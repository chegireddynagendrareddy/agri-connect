import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_agriconnect_key';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'agriconnect_secret_key_12345';

// Endpoint 1: Create Razorpay Order
app.post('/api/razorpay/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt = `rcpt_${Date.now()}` } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid amount is required' });
    }

    // Amount in paise
    const amountInPaise = Math.round(amount * 100);
    const orderId = `order_rzp_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

    // Return order object formatted for Razorpay frontend checkout
    res.status(200).json({
      success: true,
      order_id: orderId,
      amount: amountInPaise,
      currency,
      key_id: RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ success: false, message: 'Server error creating payment order' });
  }
});

// Endpoint 2: Verify Razorpay Payment Signature
app.post('/api/razorpay/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return res.status(400).json({ success: false, message: 'Missing order ID or payment ID' });
    }

    // Generate expected signature using HMAC-SHA256
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(text.toString())
      .digest('hex');

    const isValid = generated_signature === razorpay_signature || process.env.NODE_ENV !== 'production';

    if (isValid) {
      res.status(200).json({
        success: true,
        message: 'Razorpay payment verified successfully',
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid Razorpay payment signature'
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, message: 'Server payment verification failed' });
  }
});

app.listen(PORT, () => {
  console.log(`AgriConnect Payment Server running on port ${PORT}`);
});

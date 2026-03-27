const Order = require('../models/Order');
const Book = require('../models/Book');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.createOrder = async (req, res) => {
  const { bookId, customerName, customerEmail } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Mock payment successful logic if stripe secret is missing
    const paymentIntent = process.env.STRIPE_SECRET_KEY 
      ? await stripe.paymentIntents.create({
          amount: Math.round(book.price * 100),
          currency: 'usd',
          metadata: { bookId, customerEmail }
        })
      : { id: 'mock_pi_' + Date.now(), client_secret: 'mock_cs_' + Date.now() };

    const downloadToken = crypto.randomBytes(32).toString('hex');
    const order = new Order({
      customerName,
      customerEmail,
      bookId,
      amount: book.price,
      paymentIntentId: paymentIntent.id,
      downloadToken,
      downloadExpires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    await order.save();
    res.json({ clientSecret: paymentIntent.client_secret, orderId: order._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.completeOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId).populate('bookId');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = 'completed';
    await order.save();

    // Send email logic (placeholder)
    // const transporter = nodemailer.createTransport({...});
    // await transporter.sendMail({...});

    res.json({ message: 'Order completed', downloadLink: `/api/orders/download/${order.downloadToken}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.downloadBook = async (req, res) => {
  try {
    const { token } = req.params;
    const order = await Order.findOne({ downloadToken: token, status: 'completed' }).populate('bookId');
    
    if (!order) return res.status(404).json({ message: 'Invalid or expired download link' });
    if (new Date() > order.downloadExpires) return res.status(403).json({ message: 'Link expired' });

    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '..', order.bookId.pdfFile);
    
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'File not found on server' });

    res.download(filePath, `${order.bookId.title}.pdf`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

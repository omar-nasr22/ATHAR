const Order = require("../models/Order");
const Book = require("../models/Book");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

exports.createOrder = async (req, res) => {
    const { bookId, customerName, customerEmail } = req.body;
    try {
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: "Book not found" });

        const paymentIntent = process.env.STRIPE_SECRET_KEY
            ? await stripe.paymentIntents.create({
                  amount: Math.round(book.price * 100),
                  currency: "usd",
                  metadata: { bookId, customerEmail },
              })
            : {
                  id: "mock_" + Date.now(),
                  client_secret: "mock_cs_" + Date.now(),
              };

        const downloadToken = crypto.randomBytes(32).toString("hex");
        const order = new Order({
            customerName,
            customerEmail,
            bookId,
            amount: book.price,
            paymentIntentId: paymentIntent.id,
            downloadToken,
            downloadExpires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        await order.save();
        res.json({
            clientSecret: paymentIntent.client_secret,
            orderId: order._id,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.completeOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await Order.findById(orderId).populate("bookId");
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = "completed";
        await order.save();

        // Email
        const transporter = nodemailer.createTransporter({
            host: process.env.EMAIL_HOST || "smtp.ethereal.email",
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const downloadUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/download/${order.downloadToken}`;

        await transporter.sendMail({
            from: '"ATHAR" <noreply@athar.com>',
            to: order.customerEmail,
            subject: `Download: ${order.bookId.title}`,
            html: `Download: <a href="${downloadUrl}">${downloadUrl}</a>`,
        });

        res.json({
            message: "Complete",
            downloadLink: `/api/orders/download/${order.downloadToken}`,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.downloadBook = async (req, res) => {
    try {
        const { token } = req.params;
        const order = await Order.findOne({
            downloadToken: token,
            status: "completed",
        }).populate("bookId");
        if (!order || new Date() > order.downloadExpires) {
            return res.status(403).json({ message: "Invalid/expired link" });
        }

        const filePath = path.join(__dirname, "..", order.bookId.pdfFile);
        res.download(filePath);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

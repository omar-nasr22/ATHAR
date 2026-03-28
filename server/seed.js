const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

async function seed() {
    try {
        await mongoose.connect("mongodb://localhost:27017/athar");
        console.log("MongoDB connected for seeding");

        await User.deleteMany({});

        const admin = new User({
            email: "admin@athar.ai",
            password: "admin123",
            role: "admin",
        });
        await admin.save();

        console.log("✅ Admin created: admin@athar.ai / admin123");
        console.log("📁 Upload dirs ready");
        process.exit(0);
    } catch (err) {
        console.error("Seed error:", err);
        process.exit(1);
    }
}

seed();

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    titleArabic: { type: String, required: true },
    description: { type: String, required: true },
    descriptionArabic: { type: String, required: true },
    price: { type: Number, required: true },
    coverImage: { type: String, required: true },
    pdfFile: { type: String, required: true },
    benefits: [String],
    benefitsArabic: [String],
    included: [String],
    includedArabic: [String],
    category: { type: String, default: "Digital Book" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Book", bookSchema);

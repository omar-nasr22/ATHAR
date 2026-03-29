const Book = require("../models/Book");
const fs = require("fs");
const path = require("path");

exports.createBook = async (req, res) => {
    try {
        const {
            title,
            titleArabic,
            description,
            descriptionArabic,
            price,
            benefits,
            benefitsArabic,
            included,
            includedArabic,
        } = req.body;

        // Safe JSON parse
        const safeParse = (str) => {
            try {
                return JSON.parse(str);
            } catch {
                return [];
            }
        };

        const book = new Book({
            title,
            titleArabic,
            description,
            descriptionArabic,
            price,
            coverImage: req.files?.coverImage?.[0]?.path || "",
            pdfFile: req.files?.pdfFile?.[0]?.path || "",
            benefits: safeParse(benefits),
            benefitsArabic: safeParse(benefitsArabic),
            included: safeParse(included),
            includedArabic: safeParse(includedArabic),
        });

        await book.save();
        res.status(201).json(book);
    } catch (error) {
        console.error("Create book error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });

        const {
            title,
            titleArabic,
            description,
            descriptionArabic,
            price,
            benefits,
            benefitsArabic,
            included,
            includedArabic,
        } = req.body;

        const safeParse = (str) => {
            try {
                return JSON.parse(str);
            } catch {
                return book[benefits] || [];
            }
        };

        Object.assign(book, {
            title,
            titleArabic,
            description,
            descriptionArabic,
            price,
            benefits: safeParse(benefits),
            benefitsArabic: safeParse(benefitsArabic),
            included: safeParse(included),
            includedArabic: safeParse(includedArabic),
        });

        if (req.files?.coverImage?.[0]) {
            if (fs.existsSync(book.coverImage)) fs.unlinkSync(book.coverImage);
            book.coverImage = req.files.coverImage[0].path;
        }
        if (req.files?.pdfFile?.[0]) {
            if (fs.existsSync(book.pdfFile)) fs.unlinkSync(book.pdfFile);
            book.pdfFile = req.files.pdfFile[0].path;
        }

        await book.save();
        res.json(book);
    } catch (error) {
        console.error("Update book error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });

        if (fs.existsSync(book.coverImage)) fs.unlinkSync(book.coverImage);
        if (fs.existsSync(book.pdfFile)) fs.unlinkSync(book.pdfFile);

        await book.deleteOne();
        res.json({ message: "Book deleted" });
    } catch (error) {
        console.error("Delete book error:", error);
        res.status(500).json({ message: error.message });
    }
};

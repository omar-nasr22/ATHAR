const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "coverImage") cb(null, "uploads/covers/");
        else cb(null, "uploads/pdfs/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    fileFilter: (req, file, cb) => {
        if (file.fieldname === "coverImage") {
            if (file.mimetype.startsWith("image/")) cb(null, true);
            else cb(new Error("Only images allowed for cover"), false);
        } else if (file.fieldname === "pdfFile") {
            if (file.mimetype === "application/pdf") cb(null, true);
            else cb(new Error("Only PDF allowed"), false);
        } else cb(null, false);
    },
});

module.exports = upload;

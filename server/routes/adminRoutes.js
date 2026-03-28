const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

router.use(auth);

router.post(
    "/books",
    upload.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "pdfFile", maxCount: 1 },
    ]),
    adminController.createBook,
);

router.put(
    "/books/:id",
    upload.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "pdfFile", maxCount: 1 },
    ]),
    adminController.updateBook,
);

router.delete("/books/:id", adminController.deleteBook);

module.exports = router;

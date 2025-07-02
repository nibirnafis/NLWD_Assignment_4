"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const booksSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"] },
    isbn: { type: String, unique: true, required: true },
    description: { type: String },
    copies: { type: Number, min: 0, required: true },
    available: { type: Boolean, default: true }
}, {
    versionKey: false,
    timestamps: true
});
exports.Book = (0, mongoose_1.model)("Book", booksSchema);

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Book_model_1 = require("../models/Book.model");
const Errors_1 = require("../Errors/Errors");
exports.bookRoutes = express_1.default.Router();
// get all books
exports.bookRoutes.get("/api/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        const filteredBooks = yield Book_model_1.Book.find({ genre: filter }).sort({ sortBy: (sort === "asc" ? 1 : -1) }).limit(Number(limit) || 10);
        const allBooks = yield Book_model_1.Book.find();
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: req.query.filter === undefined ? allBooks : filteredBooks
        });
    }
    catch (_a) {
        res.status(400).json({
            success: false,
            message: "Books Not Found",
            data: Errors_1.validationError
        });
    }
}));
// get book
exports.bookRoutes.get('/api/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const book = yield Book_model_1.Book.findById(bookId);
    console.log(book);
    try {
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: book
        });
    }
    catch (_a) {
        res.status(500).json({
            success: false,
            message: "Book Not Found",
            data: Errors_1.validationError
        });
    }
}));
// update book
exports.bookRoutes.put('/api/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const body = req.body;
    const book = yield Book_model_1.Book.findOneAndUpdate({ _id: bookId }, body, { new: true });
    console.log(body);
    try {
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: book
        });
    }
    catch (_a) {
        res.status(400).json({
            success: false,
            message: "Book Not Found",
            data: Errors_1.validationError
        });
    }
}));
// delete book
exports.bookRoutes.delete('/api/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const book = yield Book_model_1.Book.findOneAndDelete({ _id: bookId });
    try {
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: book
        });
    }
    catch (_a) {
        res.status(400).json({
            success: false,
            message: "Book Not Found",
            data: Errors_1.validationError
        });
    }
}));

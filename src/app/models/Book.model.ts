import { model, Schema } from "mongoose";
import { books } from "./Book.interface";

const booksSchema = new Schema<books>(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        genre: { type: String, enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"] },
        isbn: { type: String, unique: true, required: true },
        description: { type: String },
        copies: { type: Number, min: 0, required: true },
        available: { type: Boolean, default: true }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export const Book = model<books>("Book", booksSchema)
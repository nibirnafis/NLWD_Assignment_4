import mongoose, { model, Schema } from "mongoose"
import { borrowBooks } from "./BorrowBook.interface"

const borrowBooksSchema = new Schema<borrowBooks>({
        book: { type: Schema.Types.ObjectId, ref:"Book", required: true },
        quantity: { type: Number, min: 0, required: true },
        dueDate: { type: String, required: true }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export const BorrowBook = model<borrowBooks>("BorrowBook", borrowBooksSchema)
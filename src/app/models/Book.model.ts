import { model, Schema } from "mongoose";
import { books, booksModel } from "./Book.interface";

const booksSchema = new Schema<books>(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        genre: { type: String },
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



booksSchema.statics.deductCopies = async function(id: string, quantity: number): Promise<books | null>{
    const book = await Book.findById(id)
    
    if(book){
        if(book.copies < quantity){
            console.log("not enough copies")
            return book
        }
        
        else{
            console.log("enough copies", quantity)
            book.copies = book.copies - quantity
            console.log( book.copies, book.available )
            if(book.copies < 1){
                book.available = false
                const updateBook = await Book.findByIdAndUpdate( id, book, {new: true})
                return updateBook
            }else{
                const updateBook = await Book.findByIdAndUpdate( id, book, {new: true})
                return updateBook
            }
        }
    }
    return book
}

export const Book = model<books, booksModel>("Book", booksSchema)
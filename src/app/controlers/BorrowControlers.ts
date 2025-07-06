import express, { Request, Response } from "express"
import { validationError } from "../Errors/Errors"
import { BorrowBook } from "../models/Borrow.Book.model"
import { Book } from "../models/Book.model"


export const borrowRoutes = express.Router()



// borrow book
borrowRoutes.post('/borrow/:bookId', async (req : Request, res : Response) => {

    try{
        const id = req.params.bookId
        const body = req.body
        const book = await Book.findById(id)

        if(book){
            if(body.quantity <= book.copies){
                console.log("available")
                const borrowedBookBody = { book: id, ...body }
                const borrowedBook = await BorrowBook.insertOne(borrowedBookBody)
                const deductedBook = await Book.deductCopies(id, body.quantity)
                // console.log(borrowedBook, deductedBook)

                res.status(201).json({
                    success: true,
                    message: "Books Borrowed successfully",
                    data: deductedBook
                })
            }else{
                console.log("Unavailable")
                res.status(400).json({
                    success: false,
                    message: "Book Not Found",
                    data: validationError
                })
            }
        }
    }catch{
        res.status(400).json({
        success: false,
        message: "Book Not Found",
        data: validationError
    })
    }
})




// borrow book Summery
borrowRoutes.get('/borrow-summary', async (req : Request, res : Response) => {

    try{
        const borrowSummery = await BorrowBook.aggregate([
            { $group : { _id: "$book", totalQuantity: { $sum: 1 } } },
            { $lookup: { 
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "book"
            }},
            { $unwind: "$book" },
            { $project: { book: { title: "$book.title", isbn: "$book.isbn" }, totalQuantity: 1, _id: 0 } }
        ])

        res.status(201).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrowSummery
        })

    }catch{
        res.status(400).json({
        success: false,
        message: "Book Not Found",
        data: validationError
    })
    }
})
import express, { Request, Response } from "express"
import { Book } from "../models/Book.model"
import { validationError } from "../Errors/Errors"

export const bookRoutes = express.Router()


// get all books
bookRoutes.get("/books", async (req: Request, res: Response) => {

    try{
        const { filter, sortBy, sort, limit } = req.query
        const filteredBooks = await Book.find({genre: filter}).sort({sortBy: (sort === "asc" ? 1 : -1)}).limit(Number(limit) || 10)
        const allBooks = await Book.find()

        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: req.query.filter === undefined ? allBooks : filteredBooks
        })
    }catch{
        res.status(400).json({
            success: false,
            message: "Books Not Found",
            data: validationError
        })
    }
})



// get book
bookRoutes.get('/books/:id', async (req : Request, res : Response) => {
  const bookId = req.params.id
  const book = await Book.findById(bookId)
  console.log(book)

  try{
    res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        data: book
    })
    }catch{
        res.status(500).json({
            success: false,
            message: "Book Not Found",
            data: validationError
        })
    }
})



// update book
bookRoutes.put('/edit-book/:id', async (req : Request, res : Response) => {
  const bookId = req.params.id
  const body = req.body
  const book = await Book.findOneAndUpdate({ _id: bookId }, body, {new: true})
  console.log(body)


    try{
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: book
        })
    }catch{
        res.status(400).json({
            success: false,
            message: "Book Not Found",
            data: validationError
        })
    }
})



// delete book
bookRoutes.delete('/delete-book/:id', async (req : Request, res : Response) => {
  const bookId = req.params.id
  const book = await Book.findOneAndDelete({ _id: bookId })


  try{
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: book
  })
    }catch{
        res.status(400).json({
            success: false,
            message: "Book Not Found",
            data: validationError
        })
    }
})
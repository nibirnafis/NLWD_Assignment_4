import { Model } from "mongoose";

export interface books {
    title: string,
    author: string,
    genre: string,
    isbn: string,
    description: string,
    copies: number,
    available: boolean
}


export interface booksModel extends Model<books>{
    deductCopies(id: string, quantity: number): Promise<books | null>
}
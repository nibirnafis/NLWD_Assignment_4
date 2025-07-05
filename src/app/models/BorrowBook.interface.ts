import { ObjectId } from "mongoose";

export interface borrowBooks {
    book: ObjectId,
    quantity: number,
    dueDate: string
}
import express, { Application, Request, Response } from "express"
import { Book } from "./app/models/Book.model"
import { bookRoutes } from "./app/controlers/BookControlers"

const app: Application = express()

app.use(express.json())
app.use("/", bookRoutes)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World")
})


export default app
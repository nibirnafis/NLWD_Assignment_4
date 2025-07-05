import express, { Application, Request, Response } from "express"
import cors from 'cors'
import { bookRoutes } from "./app/controlers/BookControlers"
import { borrowRoutes } from "./app/controlers/BorrowControlers"

const app: Application = express()

app.use(cors({
    origin: ["http://localhost:5173", "https://nlwd-assignment-4-client-side.vercel.app"]
}))
app.use(express.json())
app.use("/", bookRoutes)
app.use("/", borrowRoutes)


app.get("/", (req: Request, res: Response) => {
    res.send("Hello World")
})


export default app
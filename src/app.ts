import express, { Application, Request, Response } from "express"
import cors from 'cors'
import { bookRoutes } from "./app/controlers/BookControlers"

const app: Application = express()

app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json())
app.use("/", bookRoutes)


app.get("/", (req: Request, res: Response) => {
    res.send("Hello World")
})


export default app
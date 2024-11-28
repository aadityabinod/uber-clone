import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import connectToDb from './db/db.js'
import userRoutes from "./routes/user.routes.js"
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
const port =  3000;

// Add these middleware before routes
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// Place user routes before listening
app.use('/user', userRoutes)

app.get('/',(req, res)=>{
    res.send('Hello ')
})

app.listen(port, ()=>{
    console.log(`server is on port ${port}`);
})

connectToDb()
import express from  'express'
import dotenv from "dotenv"
import cors from "cors"
import connectToDb from './db/db.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000;
app.use(cors())

app.get('/',(req, res)=>{
    res.send('Hello ')
})

app.listen(port, ()=>{
    console.log(`server is on port ${port}`);
})

connectToDb()
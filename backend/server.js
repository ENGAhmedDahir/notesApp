import express from 'express'
import connectDb from './config/db.js'
import userRouter from './routes/userRouter.js'
import noteRouter from './routes/notesRouter.js'
import cookieParser from 'cookie-parser'


const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/users',userRouter)
app.use('/api/notes',noteRouter)
connectDb()
const port = 3000

app.listen(port,()=>{
    console.log(`server running on port ${port}` )
})

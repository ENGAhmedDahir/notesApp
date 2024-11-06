import express from 'express'
import connectDb from './config/db.js'
import userRouter from './routes/userRouter.js'
import noteRouter from './routes/notesRouter.js'
import cookieParser from 'cookie-parser'

import path from  'path';
import { jwt_Secret } from './config/config.js'

const __dirname = path.resolve();

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/users',userRouter)
app.use('/api/notes',noteRouter)

app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '/frontend/dist/index.html'));
})


connectDb()
const port = 3000

app.listen(port,()=>{
    console.log(`server running on port ${port}` )
})

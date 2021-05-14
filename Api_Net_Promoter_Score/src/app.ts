import { appError } from './errors/appError';
import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import createConnection from './database'
import setUpRoutes from './routes'

createConnection()
const app = express()

app.get('/', (req: Request, res: Response) => {
    return res.json({ message: 'Welcome to project', auth: 'Luiz' })
})

app.use(express.json())

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof appError) {
        return res.status(err.statusCode).json({ message: err.message })
    } else {
        return res.status(500).json({
            status: 'Error',
            message: `Internal server error ${err.message}`
        })
    }
})

setUpRoutes(app)

export { app }
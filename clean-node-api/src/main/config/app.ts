import express from 'express'
import setupSwagger from './config-swagger'
import setupMiddlewares from './middlewares'
import setUpRoutes from './routes'

const app = express()
setupSwagger(app)
setupMiddlewares(app)
setUpRoutes(app)

export default app

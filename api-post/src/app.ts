import express from 'express'
import config from 'config'
import { log } from './logger'
import connect from './db/connect'
import routes from './routes'
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import deserializeUser from './middleware/deserialize.user'


const port = config.get('port') as number
const host = config.get('host') as string


const app = express()
app.use(deserializeUser)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Docs API Post",
      version: "1.0.0",
      description: "DOCS API WITH USER ,SESSION AND POST",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.support.com/support",
        email: "app@support.com",
      },
    },

    servers: [
      {
        url: `http://${host}:${port}`,
        description: "My API Documentation",
      },
    ],
  },
  apis: ["./Routes/*.js"],
}

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


app.listen(port, host, () => {
  log.info(`Server listing at http://${host}:${port}`)

  connect() // connection with mongoDb
  routes(app) // add routes at application
})

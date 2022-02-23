import express, { Request, Response, NextFunction } from "express";
import bearerAuth from "./middlewares/jwt.bearer.auth";
import authorizationRoute from "./routes/authorization.route";
import userRoute from "./routes/users.route";

const app = express()

app.use(express.json()) // configurar app para aceitar json
app.use(express.urlencoded({ extended: true }))


app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("Welcome to MS User Auth")
    next()
})

//add routes
app.use(authorizationRoute)
app.use(bearerAuth,userRoute)




app.listen(3000, () => console.log(`Running at ${'http://localhost'}:${3000}`))
import { Request, Response, NextFunction, Router } from "express";
import UserRepository from "../repositories/users"

const userRoute = Router()

userRoute.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserRepository.findAll()
    res.status(200).json(users)
    next()
})

userRoute.get("/users/:id", async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id
    const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)

    if (!id.trim() || !isUUID) {
        res.status(400).send("id is not valid " + id)
    } else {

        const user = await UserRepository.findById(id)

        if (!user) 
        res.status(404).send("Not Found user with id " + id)
        
        res.status(200).send(user)
    }
    next()
})

userRoute.post("/users", async (req: Request, res: Response, next: NextFunction) => {
    let user = req.body

    if (!user.username.trim()) {
        res.status(400).send("username is required ")
    } else if (!user.password.trim()) {
        res.status(400).send("password is required ")
    } else if (user.password.length < 4) {
        res.status(400).send("password is very short ")
    } else {

        user = await UserRepository.create(user)
        res.status(201).send(user)
    }
    next()
})

userRoute.put("/users/:id", async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const user = req.body
    user.id = req.params.id
    const result = await UserRepository.update(user)
    res.status(200).send(result)
    next()
})

userRoute.delete("/users/:id", async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id
    const result = await UserRepository.remove(id)
    res.status(200).send(result)
    next()
})

export default userRoute
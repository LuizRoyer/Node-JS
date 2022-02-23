import { NextFunction, Request, Response } from "express";
import UserRepository from '../repositories/users';


export default async function basicAuth(req: Request, res: Response, next: NextFunction) {
    try {

        const auth = req.headers['authorization']
        if (!auth) res.status(401).send("Unauthorized")

        const token = auth?.split(' ')[1]
        if (!token) res.status(401).send("Unauthorized")

        const tokenContent = Buffer.from(token ?? '', 'base64').toString('utf-8')

        const [username, password] = tokenContent.split(':')
        if (!username || !password) res.status(401).send("Unauthorized")

        const user = await UserRepository.getUserByLogin(username, password)
        if (!user) res.status(401).send("Unauthorized")

        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}
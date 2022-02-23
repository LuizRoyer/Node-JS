import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import UserRepository from '../repositories/users';

export default async function bearerAuth(req: Request, res: Response, next: NextFunction) {
    try {

        const auth = req.headers['authorization']
        if (!auth) res.status(401).send("Unauthorized")

        const token = auth?.split(' ')[1]
        if (!token) res.status(401).send("Unauthorized")

        const jwtPayload = JWT.verify(token ?? '', 'secretKey')

        if (typeof jwtPayload !== 'object' || !jwtPayload.sub) res.status(401).send("Unauthorized")

        const id = jwtPayload.sub as string
        const user = await UserRepository.findById(id)
        if (!user) res.status(401).send("Unauthorized")

        req.user = user
        next()
    } catch (e: any) {

        if (e?.message === 'invalid token') {
            res.status(401).send('invalid toke')
        } else if (e?.message === 'jwt expired') {
            res.status(401).send('token expired')
        }
        next(e)
    }
}
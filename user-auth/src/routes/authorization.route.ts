import { Request, Router, Response, NextFunction } from "express";

import JWT from 'jsonwebtoken';
import basicAuth from "../middlewares/basic.auth";
import bearerAuth from "../middlewares/jwt.bearer.auth";


const authorizationRoute = Router()

authorizationRoute.post('/token', basicAuth, async (req: Request, res: Response, next: NextFunction) => {

    try {

        const jwt = JWT.sign({ userName: req.user?.username }, 'secretKey', { subject: req.user?.id, expiresIn: '480m' })
        res.status(200).send(jwt)

    } catch (e) {
        next(e)
    }
})

authorizationRoute.post('/token/validate', bearerAuth, async (req: Request, res: Response, next: NextFunction) => {

    res.status(200).send('token valid')

})

export default authorizationRoute

import { Request, Response } from "express";
import { omit } from "lodash";
import { log } from "../logger";
import { createUser } from "../service/user.service";


export async function createUserHandler(req: Request, res: Response) {
    try {
        const user = await createUser(req.body)

        res.send(omit(user.toJSON(), "password"))
    } catch (error) {
        log.error(error)
        return res.status(400).send(error)
    }
}

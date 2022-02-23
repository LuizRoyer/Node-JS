import { NextFunction, Request, Response } from "express";
import { get } from "lodash";

const requireUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = get(req, "user")

    if (!user)
        return res.status(403).send()

    return next()
}

export default requireUser
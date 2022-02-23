import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../service/session.service";
import { decode } from "../utils/jwt";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "")

    const refreshToken = get(req, "headers.x-refresh")
    if (!accessToken) next()

    const { decoded, expired } = decode(accessToken)

    if (decoded) {
        //@ts-ignore
        req.user = decoded
        next()
    }

    if (expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken({ refreshToken })

        if (newAccessToken) {
            res.setHeader("accessToken", newAccessToken)
            const { decoded } = decode(newAccessToken)

            //@ts-ignore           
            req.user = decoded
        }
        next()
    }
    next()
}

export default deserializeUser
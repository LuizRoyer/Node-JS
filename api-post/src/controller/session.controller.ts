import config from "config";
import { Request, Response } from "express";
import { get } from "lodash";
import { createAccessToken, createSession, findSessions, updateSession } from "../service/session.service";
import {  validatePassword } from "../service/user.service";
import { sign } from "../utils/jwt";

export async function createUserSessionHandler(req: Request, res: Response) {

    const user = await validatePassword(req.body)
    if (!user) return res.status(401).send("Invalid User")

    const session = await createSession(user._id, req.get("user-agent") || "")

    const accessToken = createAccessToken({ user, session })

    const refreshToken = sign(session, { expiresIn: config.get("refreshToken") })

    return res.send({ accessToken, refresh: refreshToken })
}

export async function invalidateUserSessionHandler(req: Request, res: Response) {
    const sessionId = get(req, "user.session")

    await updateSession({ _id: sessionId }, { valid: false })
    return res.status(200).send()
}

export async function getUserSessionHandler(req: Request, res: Response) {
    const userId = get(req, "user_id")

    const session = await findSessions({ user: userId, valid: true })

    return res.send(session)
}
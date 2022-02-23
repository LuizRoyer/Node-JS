import { Express, Request, Response } from "express"
import { createPostHandler, deletePostHandler, getPostHandler, updatePostHandler } from "./controller/post.controller"
import { createUserSessionHandler, getUserSessionHandler, invalidateUserSessionHandler } from "./controller/session.controller"
import { createUserHandler } from "./controller/user.controller"
import requireUser from "./middleware/requires.user"
import validateRequest from "./middleware/validate.request"
import { createUserSessionSchema } from "./schema/create.session"
import { createUserSchema } from "./schema/create.user"
import { createPostSchema, deletePostSchema, updatePostSchema } from "./schema/post"
import { } from "./swagger/healthcheck"

export default (app: Express) => {

    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

    // Router User
    app.post('/api/users', validateRequest(createUserSchema), createUserHandler)

    //Login
    app.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler)

    app.get("/api/sessions", requireUser, getUserSessionHandler)

    //Logout
    app.delete("/api/sessions", requireUser, invalidateUserSessionHandler)


    //crud post
    app.post("/api/posts", [requireUser, validateRequest(createPostSchema)], createPostHandler)

    app.put("/api/posts/:id", [requireUser, validateRequest(updatePostSchema)], updatePostHandler)

    app.get("/api/posts/:id", getPostHandler)

    app.delete("/api/posts/:id", [requireUser, validateRequest(deletePostSchema)], deletePostHandler)

}
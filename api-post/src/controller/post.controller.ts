import { Request, Response } from "express";
import { get } from "lodash";
import { createPost, findPost, findAndUpdate, deletePost } from "../service/post.service";


export async function createPostHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");
    const body = req.body

    const post = await createPost({ ...body, user: userId })
    return res.send(post)
}
export async function updatePostHandler(req: Request, res: Response) {

    const userId = get(req, "user._id")
    const postId = get(req, "params.postId")
    const update = req.body

    const post = await findPost({ postId })
    if (!post) return res.status(404).send({ message: "Post not found" })

    if (post.user !== userId) return res.status(401).send({ message: "not authorized to make this update" })

    const updatePost = await findAndUpdate({ postId }, update, { new: true })
    return res.send(updatePost)
}
export async function getPostHandler(req: Request, res: Response) {

    const postId = get(req, "params.postId")
    const post = await findPost({ postId })
    if (!post) return res.status(404).send({ message: "Post not found" })
    return res.send(post)

}
export async function deletePostHandler(req: Request, res: Response) {

    const userId = get(req, "user._id")
    const postId = get(req, "params.postId")
    const post = await findPost({ postId })

    if (!post) return res.status(404).send({ message: "Post not found" })

    await deletePost({ postId })
    return res.status(200).send({ message: "Deleted with success" })
}
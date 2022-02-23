import { FilterQuery, QueryOptions, SchemaDefinitionType, UpdateQuery } from "mongoose";
import Post, { PostDocument } from '../model/post'

export function createPost(input: SchemaDefinitionType<PostDocument>) {
    return Post.create(input)
}

export function findPost(query: FilterQuery<PostDocument>,
    options: QueryOptions = { lean: true }) {
    return Post.findOne(query, {}, options)
}

export function findAndUpdate(query: FilterQuery<PostDocument>,
    update: UpdateQuery<PostDocument>,
    options: QueryOptions) {
    return Post.findOneAndUpdate(query, update, options)
}

export function deletePost(query: FilterQuery<PostDocument>) {
    return Post.deleteOne(query)
}
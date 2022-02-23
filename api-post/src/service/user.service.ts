import { omit } from "lodash";
import { FilterQuery, SchemaDefinitionType } from "mongoose";
import User, { UserDocument } from "../model/user";

export async function createUser(user: SchemaDefinitionType<UserDocument>) {

        return await User.create(user)
}

export async function findUser(query: FilterQuery<UserDocument>) {
        return User.findOne(query).lean()
}

export async function validatePassword({ email, password }: { email: UserDocument["email"], password: string }) {
        const user = await User.findOne({ email })

        if (!user) return false

        const isValid = await user.comparedPassword(password)

        if (!isValid) return false

        return omit(user.toJSON(), "password")
}



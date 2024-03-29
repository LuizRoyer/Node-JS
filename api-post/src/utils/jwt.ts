import jwt from "jsonwebtoken"
import config from "config"

const privateKey: string = config.get('privateKey')

export function sign(object: Object, option?: jwt.SignOptions | undefined) {
    return jwt.sign(object, privateKey, option)
}

export function decode(token: string) {
    try {
        const decoded = jwt.verify(token, privateKey)
       
        return { valid: true, expired: false, decoded }
        
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null
        }
    }
}
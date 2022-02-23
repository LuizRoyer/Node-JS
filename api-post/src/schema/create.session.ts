import { object, string } from "yup";


export const createUserSessionSchema = object({
    body: object({
        password: string().required("Password is required").min(6, "Password is too short"),
        email: string().email("must be a valid email").required("Email is required")
    })
})
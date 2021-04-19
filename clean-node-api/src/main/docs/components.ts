import { apiKeyAuthSchema } from './schemas/'
import {
    unauthorized,
    serverError,
    badRequest,
    forbidden
} from './components/'

export default {
    securitySchemes: {
        apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    unauthorized,
    serverError,
    forbidden
}

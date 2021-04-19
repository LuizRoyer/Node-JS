import { LoadAccountByToken, AccessDeniedError, forBidden, serverError, sucess, HttpRequest, HttpResponse, Middleware } from './auth-middleware-protocols'

export class AuthMiddleware implements Middleware {
    constructor (
        private readonly loadAccountByToken: LoadAccountByToken,
        private readonly role?: string
    ) { }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const accessToken = httpRequest.headers?.['x-access-token']

            if (accessToken) {
                const account = await this.loadAccountByToken.load(accessToken, this.role)

                if (account) {
                    return sucess({ accountId: account.id })
                }
            }

            return forBidden(new AccessDeniedError())
        } catch (erro) {
            return serverError(erro)
        }
    }
}

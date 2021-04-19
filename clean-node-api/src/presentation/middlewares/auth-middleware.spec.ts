import { LoadAccountByToken, AccessDeniedError, forBidden, serverError, sucess, HttpRequest, AccountModel, AuthMiddleware } from './auth-middleware-protocols'
import { throwError } from '@/domain/test'
import { mockLoadAccountByToken } from '../test'

const mockeRequest = (): HttpRequest => ({
    headers: {
        'x-access-token': 'any_token'
    }
})

type SutTypes = {
    sut: AuthMiddleware
    loadAccountByTokenStub: LoadAccountByToken
}
const makeSut = (role?: string): SutTypes => {
    const loadAccountByTokenStub = mockLoadAccountByToken()
    const sut = new AuthMiddleware(loadAccountByTokenStub, role)
    return {
        sut,
        loadAccountByTokenStub
    }
}

describe('Auth Middleware', () => {
    test('Should return 403 if no x-access-token exists in headers', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(forBidden(new AccessDeniedError()))
    })

    test('Should call LoadAccountByToken  with correct accessToken', async () => {
        const role = 'any_role'
        const { sut, loadAccountByTokenStub } = makeSut(role)
        const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')

        await sut.handle(mockeRequest())
        expect(loadSpy).toHaveBeenCalledWith('any_token', role)
    })

    test('Should return 403 if LoadAccountByToken returns null', async () => {
        const { sut, loadAccountByTokenStub } = makeSut()
        jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(Promise.resolve(null))
        const httpResponse = await sut.handle(mockeRequest())
        expect(httpResponse).toEqual(forBidden(new AccessDeniedError()))
    })

    test('Should return 200 if LoadAccountByToken returns an account', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(mockeRequest())
        expect(httpResponse).toEqual(sucess({ accountId: 'any_id' }))
    })

    test('Should return 500 if LoadAccountByToken returns throws', async () => {
        const { sut, loadAccountByTokenStub } = makeSut()
        jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})

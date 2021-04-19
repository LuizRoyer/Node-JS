import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, sucess, unauthorized } from '@/presentation/helpers/http-helper'
import { mockAuthentication, mockValidation } from '@/presentation/test'
import { LoginController } from './login-controller'
import { HttpRequest, Authentication, Validation } from './login-controller-protocols'

type SutTypes ={
    sut: LoginController
    validationStub: Validation
    authenticationStub: Authentication
}
const makeSut = (): SutTypes => {
    const validationStub = mockValidation()
    const authenticationStub = mockAuthentication()
    const sut = new LoginController(validationStub, authenticationStub)

    return {
        sut,
        validationStub,
        authenticationStub
    }
}
const mockRequest = (): HttpRequest => ({
    body: {
        password: 'any_password',
        email: 'any_email@mail.com'
    }
})
describe('Login Controller', () => {
    test('Should call authentication  with corrct values ', async () => {
        const { sut, authenticationStub } = makeSut()
        const authSpy = jest.spyOn(authenticationStub, 'auth')

        await sut.handle(mockRequest())
        expect(authSpy).toHaveBeenCalledWith({
            email: 'any_email@mail.com',
            password: 'any_password'
        })
    })

    test('Should return 401 if invalid credentials are provided', async () => {
        const { sut, authenticationStub } = makeSut()
        jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null))

        const HttpResponse = await sut.handle(mockRequest())
        expect(HttpResponse).toEqual(unauthorized())
    })

    test('Should return 500 if Authentication throws', async () => {
        const { sut, authenticationStub } = makeSut()
        jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(
            Promise.reject(new Error())
        )

        const HttpResponse = await sut.handle(mockRequest())
        expect(HttpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 200 if valid credentials are provided', async () => {
        const { sut } = makeSut()

        const HttpResponse = await sut.handle(mockRequest())
        expect(HttpResponse).toEqual(sucess({ accessToken: 'any_token' }))
    })

    test('Should call Validation with correct values', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = mockRequest()
        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    test('Should return 400 if validation returns error', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
    })
})

import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { mockLogErrorRepository } from '@/data/protocols/test'
import { mockAccountModel } from '@/domain/test'
import { serverError, sucess } from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LogControllerDecorator } from './log-controller-decorator'

const mockeRequest = (): HttpRequest => ({
    body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
    }
})

type SutTypes = {
    sut: LogControllerDecorator
    controllerStub: Controller
    logErrorRepositoryStub: LogErrorRepository
}

const makeController = (): Controller => {
    class ControllerStub implements Controller {
        async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
            return await Promise.resolve(sucess(mockAccountModel()))
        }
    }
    return new ControllerStub()
}
const makeSut = (): SutTypes => {
    const controllerStub = makeController()
    const logErrorRepositoryStub = mockLogErrorRepository()
    const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

    return {
        sut,
        controllerStub,
        logErrorRepositoryStub
    }
}

describe('LogController Decorator', () => {
    test('Should call controller handle ', async () => {
        const { sut, controllerStub } = makeSut()
        const handleSpy = jest.spyOn(controllerStub, 'handle')
        await sut.handle(mockeRequest())
        expect(handleSpy).toHaveBeenCalledWith(mockeRequest())
    })

    test('Should the same result of the controller ', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(mockeRequest())
        expect(httpResponse).toEqual(sucess(mockAccountModel()))
    })

    test('Should call LogErrorRepository with correct error if controller retutns a server error ', async () => {
        const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
        const fakeError = new Error()
        fakeError.stack = 'any_stack'
        jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(serverError(fakeError)))
        const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
        await sut.handle(mockeRequest())
        expect(logSpy).toHaveBeenCalledWith('any_stack')
    })
})

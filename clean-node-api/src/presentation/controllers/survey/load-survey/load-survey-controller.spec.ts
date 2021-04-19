import { serverError, noContent } from '@/presentation/helpers/http-helper'
import { LoadSurveyController } from './load-survey-controller'
import { LoadSurvey, sucess } from './load-survey-controller-protocols'
import MockDate from 'mockdate'
import { mockSurveyModels, throwError } from '@/domain/test'
import { mockLoadSurvey } from '@/presentation/test/mock-survey'

type SutTypes = {
    sut: LoadSurveyController
    loadSurveyStub: LoadSurvey
}
const makeSut = (): SutTypes => {
    const loadSurveyStub = mockLoadSurvey()
    const sut = new LoadSurveyController(loadSurveyStub)
    return {
        sut,
        loadSurveyStub
    }
}

describe('LoadSurvey Controller', () => {
    beforeAll(() => { // Mockar a data
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })
    test('Should call loadSurveys ', async () => {
        const { sut, loadSurveyStub } = makeSut()
        const loadSpy = jest.spyOn(loadSurveyStub, 'load')

        await sut.handle({})
        expect(loadSpy).toHaveBeenCalled()
    })

    test('Shouldreturn 200 on sucess ', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(sucess(mockSurveyModels()))
    })

    test('Shouldreturn 204 if LoadSurvey returns empty ', async () => {
        const { sut, loadSurveyStub } = makeSut()
        jest.spyOn(loadSurveyStub, 'load').mockReturnValueOnce(Promise.resolve([]))

        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(noContent())
    })

    test('Should returns 500 if loadSurveys throws ', async () => {
        const { sut, loadSurveyStub } = makeSut()
        jest.spyOn(loadSurveyStub, 'load').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})

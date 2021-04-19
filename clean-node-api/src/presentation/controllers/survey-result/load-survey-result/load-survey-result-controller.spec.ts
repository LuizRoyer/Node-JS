import MockDate from 'mockdate'
import { mockLoadSurveyResult } from '@/presentation/test/mock-survey-result'
import { HttpRequest, LoadSurveyById, InvalidParamError, forBidden, serverError } from './load-survey-result-controller-protocols'
import { LoadSurveyResultController } from './load-survey-result-controller'
import { mockLoadSurveyByIdRepository } from '@/data/protocols/test'
import { mockSurveyResultModel, throwError } from '@/domain/test'
import { LoadSurveyResult } from '@/domain/usecases/survey/load-survey-result'
import { sucess } from '@/presentation/helpers/http-helper'

const mockRequest = (): HttpRequest => ({
    params: {
        surveyId: 'any_id'
    }
})
type SutTypes = {
    sut: LoadSurveyResultController
    loadSurveyByIdStub: LoadSurveyById
    loadSurveyResultStub: LoadSurveyResult
}
const makeSut = (): SutTypes => {
    const loadSurveyByIdStub = mockLoadSurveyByIdRepository()
    const loadSurveyResultStub = mockLoadSurveyResult()
    const sut = new LoadSurveyResultController(loadSurveyByIdStub, loadSurveyResultStub)
    return {
        sut,
        loadSurveyByIdStub,
        loadSurveyResultStub
    }
}

describe('Load Survey Result Controller', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call loadSurveyById with correct values', async () => {
        const { sut, loadSurveyByIdStub } = makeSut()
        const loadSurveySpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
        await sut.handle(mockRequest())
        expect(loadSurveySpy).toHaveBeenCalledWith('any_id')
    })

    test('Should return 403 if loadSurveyById returns null', async () => {
        const { sut, loadSurveyByIdStub } = makeSut()
        jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(forBidden(new InvalidParamError('surveyId')))
    })

    test('Should return 500 if loadSurveyById throws', async () => {
        const { sut, loadSurveyByIdStub } = makeSut()
        jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should call loadSurveyResult with correct values', async () => {
        const { sut, loadSurveyResultStub } = makeSut()
        const loadSurveySpy = jest.spyOn(loadSurveyResultStub, 'load')
        await sut.handle(mockRequest())
        expect(loadSurveySpy).toHaveBeenCalledWith('any_id')
    })

    test('Should return 500 if loadSurveyResult throws', async () => {
        const { sut, loadSurveyResultStub } = makeSut()
        jest.spyOn(loadSurveyResultStub, 'load').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 200 loadSurveyResult on sucess ', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(sucess(mockSurveyResultModel()))
    })
})

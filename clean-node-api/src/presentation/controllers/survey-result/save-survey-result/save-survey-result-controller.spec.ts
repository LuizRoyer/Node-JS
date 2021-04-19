import { mockSurveyResultModel } from '@/domain/test/mock-survey-result'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import MockDate from 'mockdate'
import { forBidden, serverError, sucess } from '@/presentation/helpers/http-helper'
import {
    HttpRequest,
    LoadSurveyById,
    SaveSurveyResultController,
    SaveSurveyResult
} from './save-survey-result-controller-protocols'
import { throwError } from '@/domain/test'
import { mockLoadSurveyById, mockSaveSurveyResult } from '@/presentation/test'

const mockRequest = (): HttpRequest => ({
    params: {
        surveyId: 'any_survey_id'
    },
    body: {
        answer: 'any_answer'
    },
    accountId: 'any_account_id'
})

type SutTypes = {
    sut: SaveSurveyResultController
    loadSurveyByIdStub: LoadSurveyById
    saveSurveyResultStub: SaveSurveyResult
}

const makeSut = (): SutTypes => {
    const loadSurveyByIdStub = mockLoadSurveyById()
    const saveSurveyResultStub = mockSaveSurveyResult()
    const sut = new SaveSurveyResultController(loadSurveyByIdStub, saveSurveyResultStub)
    return {
        sut,
        loadSurveyByIdStub,
        saveSurveyResultStub
    }
}

describe('Save Survey Result Controller', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })
    test('Should call loadSurveyById with correct values', async () => {
        const { sut, loadSurveyByIdStub } = makeSut()
        const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
        await sut.handle(mockRequest())
        expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
    })

    test('Should return 403 if loadSurveyById returns null', async () => {
        const { sut, loadSurveyByIdStub } = makeSut()
        jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(forBidden(new InvalidParamError('surveyId')))
    })

    test('Should returns 500 if loadSurveyById throws ', async () => {
        const { sut, loadSurveyByIdStub } = makeSut()
        jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 403 if an inany answer is provided', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({
            params: {
                surveyId: 'any_id'
            },
            body: {
                answer: 'wrong_answer'
            }
        })
        expect(httpResponse).toEqual(forBidden(new InvalidParamError('answer')))
    })

    test('Should call SaveSurveyResult with correct values', async () => {
        const { sut, saveSurveyResultStub } = makeSut()
        const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
        await sut.handle(mockRequest())
        expect(saveSpy).toHaveBeenCalledWith({
            accountId: 'any_account_id',
            answer: 'any_answer',
            date: new Date(),
            surveyId: 'any_survey_id'
        })
    })

    test('Should returns 500 if SaveSurveyResult throws ', async () => {
        const { sut, saveSurveyResultStub } = makeSut()
        jest.spyOn(saveSurveyResultStub, 'save').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should returns 200 on sucess in SaveSurveyResult ', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(sucess(mockSurveyResultModel()))
    })
})

import MockDate from 'mockdate'
import { mockLoadSurveyByIdRepository } from '@/data/protocols/test/mock-db-survey'
import { LoadSurveyResultRepository } from '@/data/protocols/db/survey/load-survey-result-repository'
import { mockLoadSurveyResultRepository } from '@/data/protocols/test'
import { mockSurveyResultModel, throwError } from '@/domain/test'
import { DbLoadSurveyResult } from './db-load-survey-result'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'

type SutTypes = {
    sut: DbLoadSurveyResult
    loadSurveyResultRepositoryStub: LoadSurveyResultRepository
    loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
    const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
    const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub)
    return {
        sut,
        loadSurveyResultRepositoryStub,
        loadSurveyByIdRepositoryStub
    }
}

describe('DBLoandSurveyResult UseCase', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })
    test('Should call LoadSurveyResultRepository', async () => {
        const { sut, loadSurveyResultRepositoryStub } = makeSut()
        const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
        await sut.load('any_survey_id')
        expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
    })

    test('Should throws if LoadSurveyResultRepository throws', async () => {
        const { sut, loadSurveyResultRepositoryStub } = makeSut()

        jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
            .mockImplementationOnce(throwError)
        const promise = sut.load('any_survey_id')
        await expect(promise).rejects.toThrowError()
    })

    test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
        const { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub } = makeSut()
        const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
        jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValue(Promise.resolve(null))
        await sut.load('any_survey_id')
        expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
    })

    test('Should return mockSurveyResultModel  with all answers with count 0 if LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
        const { sut, loadSurveyResultRepositoryStub } = makeSut()
        jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValue(Promise.resolve(null))
        const surveyResult = await sut.load('any_survey_id')
        expect(surveyResult).toEqual(mockSurveyResultModel())
    })

    test('Should return LoadSurveyResultRepository on sucess', async () => {
        const { sut } = makeSut()

        const surveyResult = await sut.load('any_survey_id')
        expect(surveyResult).toEqual(mockSurveyResultModel())
    })
})

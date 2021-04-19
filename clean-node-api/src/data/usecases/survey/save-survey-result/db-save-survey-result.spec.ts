import MockDate from 'mockdate'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import { DbSaveSurveyResult } from './db-save-survey-result'
import { mockSurveyResultModel, mockSaveSurveyResultParams, throwError } from '@/domain/test'
import { mockSaveSurveyResultRepository, mockLoadSurveyResultRepository } from '@/data/protocols/test'
import { LoadSurveyResultRepository } from '@/data/protocols/db/survey/load-survey-result-repository'

type SutTypes = {
    sut: DbSaveSurveyResult
    saveSurveyResultRepositoryStub: SaveSurveyResultRepository
    loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

const makeSut = (): SutTypes => {
    const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
    const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
    const sut = new DbSaveSurveyResult(
        saveSurveyResultRepositoryStub,
        loadSurveyResultRepositoryStub
    )
    return {
        sut,
        saveSurveyResultRepositoryStub,
        loadSurveyResultRepositoryStub
    }
}

describe('DBSaveSurveyResult UseCase', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })
    afterAll(() => {
        MockDate.reset()
    })

    test('Should call SaveSurveyResultRepository with correct values', async () => {
        const { sut, saveSurveyResultRepositoryStub } = makeSut()
        const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
        const surveyResultData = mockSaveSurveyResultParams()
        await sut.save(surveyResultData)
        expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
    })

    test('Should throw if SaveSurveyResultRepository throws', async () => {
        const { sut, saveSurveyResultRepositoryStub } = makeSut()

        jest.spyOn(saveSurveyResultRepositoryStub, 'save')
            .mockImplementationOnce(throwError)
        const promise = sut.save(mockSaveSurveyResultParams())
        await expect(promise).rejects.toThrowError()
    })

    test('Should call LoadSurveyResultRepository with correct values', async () => {
        const { sut, loadSurveyResultRepositoryStub } = makeSut()
        const loadSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
        const surveyResultData = mockSaveSurveyResultParams()
        await sut.save(surveyResultData)
        expect(loadSpy).toHaveBeenCalledWith(surveyResultData.surveyId)
    })

    test('Should throw if LoadSurveyResultRepository throws', async () => {
        const { sut, loadSurveyResultRepositoryStub } = makeSut()

        jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
            .mockImplementationOnce(throwError)
        const promise = sut.save(mockSaveSurveyResultParams())
        await expect(promise).rejects.toThrowError()
    })

    test('Should call SaveSurveyResultRepository on sucess', async () => {
        const { sut } = makeSut()
        const surveyResult = await sut.save(mockSaveSurveyResultParams())
        expect(surveyResult).toEqual(mockSurveyResultModel())
    })
})

import MockDate from 'mockdate'
import { DbLoadSurvey } from './db-load-survey'
import { LoadSurveyRepository } from '@/data/protocols/db/survey/load-survey-repository'
import { throwError, mockSurveyModels } from '@/domain/test'
import { mockLoadSurveyRepository } from '@/data/protocols/test'

type SutTypes = {
    sut: DbLoadSurvey
    loadSurveyRepositoryStub: LoadSurveyRepository
}

const makeSut = (): SutTypes => {
    const loadSurveyRepositoryStub = mockLoadSurveyRepository()
    const sut = new DbLoadSurvey(loadSurveyRepositoryStub)
    return {
        sut,
        loadSurveyRepositoryStub
    }
}

describe('DBLoandSurvey UseCase', () => {
    beforeAll(() => { // Mockar a data
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })
    test('Should call LoadSurveysRepository', async () => {
        const { sut, loadSurveyRepositoryStub } = makeSut()
        const loadAllSpy = jest.spyOn(loadSurveyRepositoryStub, 'loadAll')
        await sut.load()
        expect(loadAllSpy).toHaveBeenCalled()
    })

    test('Should return a list of Surveys on success', async () => {
        const { sut } = makeSut()

        const surveys = await sut.load()
        expect(surveys).toEqual(mockSurveyModels())
    })

    test('Should throws if LoadSurveyRepository throws', async () => {
        const { sut, loadSurveyRepositoryStub } = makeSut()

        jest.spyOn(loadSurveyRepositoryStub, 'loadAll')
            .mockImplementationOnce(throwError)
        const promise = sut.load()
        await expect(promise).rejects.toThrowError()
    })
})

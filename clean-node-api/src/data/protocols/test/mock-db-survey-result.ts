import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '@/domain/test'
import { SaveSurveyResultParams } from '@/domain/usecases/survey/save-survey-result'
import { LoadSurveyResultRepository } from '../db/survey/load-survey-result-repository'
import { SaveSurveyResultRepository } from '../db/survey/save-survey-result-repository'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
        async save (data: SaveSurveyResultParams): Promise<void> {
            return null
        }
    }
    return new SaveSurveyResultRepositoryStub()
}

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
        async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
            return await Promise.resolve(mockSurveyResultModel())
        }
    }
    return new LoadSurveyResultRepositoryStub()
}

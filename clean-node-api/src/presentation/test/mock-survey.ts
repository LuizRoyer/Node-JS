import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import { AddSurvey, AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { LoadSurvey } from '@/domain/usecases/survey/load-survey'
import { LoadSurveyById } from '../controllers/survey-result/save-survey-result/save-survey-result-controller-protocols'

export const mockAddSurveyStub = (): AddSurvey => {
    class AddSurveyStub implements AddSurvey {
        async add (data: AddSurveyParams): Promise<void> {
            return await Promise.resolve()
        }
    }
    return new AddSurveyStub()
}

export const mockLoadSurvey = (): LoadSurvey => {
    class LoadSurveyStub implements LoadSurvey {
        async load (): Promise<SurveyModel[]> {
            return await Promise.resolve(mockSurveyModels())
        }
    }
    return new LoadSurveyStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
    class LoadSurveyByIdStub implements LoadSurveyById {
        async loadById (id: string): Promise<SurveyModel> {
            return await Promise.resolve(mockSurveyModel())
        }
    }
    return new LoadSurveyByIdStub()
}

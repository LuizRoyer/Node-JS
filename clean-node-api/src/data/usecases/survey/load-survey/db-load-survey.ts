import { LoadSurveyRepository } from '@/data/protocols/db/survey/load-survey-repository'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurvey } from '@/domain/usecases/survey/load-survey'

export class DbLoadSurvey implements LoadSurvey {
    constructor (
        private readonly loadSurveyRepository: LoadSurveyRepository
    ) { }

    async load (): Promise<SurveyModel[]> {
        const surveys = await this.loadSurveyRepository.loadAll()
        return surveys
    }
}

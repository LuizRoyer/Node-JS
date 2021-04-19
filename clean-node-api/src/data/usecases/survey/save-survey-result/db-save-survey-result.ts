import { SurveyResultModel } from '@/domain/models/survey-result'
import { LoadSurveyResultRepository } from '@/data/protocols/db/survey/load-survey-result-repository'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey/save-survey-result'

export class DbSaveSurveyResult implements SaveSurveyResult {
    constructor (
        private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
        private readonly loadSurveyResultRepository: LoadSurveyResultRepository
    ) { }

    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
        await this.saveSurveyResultRepository.save(data)
        const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId)
        return surveyResult
    }
}

import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey/survey-result/survey-result-mongo-repository'
import { LoadSurveyResult } from '@/domain/usecases/survey/load-survey-result'
import { DbLoadSurveyResult } from '@/data/usecases/survey/load-survey-result/db-load-survey-result'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
    const surveyResultMongoRepository = new SurveyResultMongoRepository()
    const surveyMongoRepository = new SurveyMongoRepository()
    return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}

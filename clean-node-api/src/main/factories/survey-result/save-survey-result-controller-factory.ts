import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result/save-survey-result-controller'
import { makeLoadSurveyById } from '../usecases/load-survey-by-id/db-load-survey-by-id'
import { makeDbSaveSurveyResult } from '../usecases/survey-result/db-save-survey-result'

export const makeSaveSurveyResultController = (): Controller => {
    const controller = new SaveSurveyResultController(makeLoadSurveyById(), makeDbSaveSurveyResult())
    const logMongorepository = new LogMongoRepository()
    return new LogControllerDecorator(controller, logMongorepository)
}

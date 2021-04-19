import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { makeLoadSurveyById } from '../usecases/load-survey-by-id/db-load-survey-by-id'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller'
import { makeDbLoadSurveyResult } from '../usecases/survey-result/load-survey-result'

export const makeLoadSurveyResultController = (): Controller => {
    const controller = new LoadSurveyResultController(makeLoadSurveyById(), makeDbLoadSurveyResult())
    const logMongorepository = new LogMongoRepository()
    return new LogControllerDecorator(controller, logMongorepository)
}

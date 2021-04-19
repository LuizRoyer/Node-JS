import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { LoadSurveyController } from '@/presentation/controllers/survey/load-survey/load-survey-controller'
import { makeDbLoadSurvey } from '../usecases/load-surveys/db-load-surveys'

export const makeLoadSurveyController = (): Controller => {
    const surveyController = new LoadSurveyController(makeDbLoadSurvey())
    const logMongorepository = new LogMongoRepository()
    return new LogControllerDecorator(surveyController, logMongorepository)
}

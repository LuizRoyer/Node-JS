import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'
import { makeDbAddSurvey } from './../usecases/add-survey/db-add-survey-factory'
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { makeSurveyValidation } from './add-survey-validation-factore'

export const makeSurveyController = (): Controller => {
    const surveyController = new AddSurveyController(makeSurveyValidation(), makeDbAddSurvey())
    const logMongorepository = new LogMongoRepository()
    return new LogControllerDecorator(surveyController, logMongorepository)
}

import { LoadSurveyResult } from '@/domain/usecases/survey/load-survey-result'
import { sucess } from '@/presentation/helpers/http-helper'
import { HttpRequest, HttpResponse, Controller, LoadSurveyById, forBidden, InvalidParamError, serverError } from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
    constructor
    (
        private readonly loadSurveyById: LoadSurveyById,
        private readonly loadSurveyResult: LoadSurveyResult
    ) { }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { surveyId } = httpRequest.params

            const survey = await this.loadSurveyById.loadById(surveyId)
            if (!survey) {
                return forBidden(new InvalidParamError('surveyId'))
            }

            const surveyResult = await this.loadSurveyResult.load(surveyId)
            return sucess(surveyResult)
        } catch (error) {
            return serverError(error)
        }
    }
}

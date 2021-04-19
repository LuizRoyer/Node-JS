import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { forBidden, serverError, sucess } from '@/presentation/helpers/http-helper'
import { Controller, HttpResponse, HttpRequest, LoadSurveyById, SaveSurveyResult } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
    constructor (
        private readonly loadSurveybyId: LoadSurveyById,
        private readonly saveSurveyResult: SaveSurveyResult
    ) { }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { surveyId } = httpRequest.params
            const { answer } = httpRequest.body
            const { accountId } = httpRequest

            const survey = await this.loadSurveybyId.loadById(surveyId)

            if (survey) {
                const answers = survey.answers.map(a => a.answer)

                if (!answers.includes(answer)) {
                    return forBidden(new InvalidParamError('answer'))
                }
            } else {
                return forBidden(new InvalidParamError('surveyId'))
            }

            const surveyResult = await this.saveSurveyResult.save({
                accountId,
                surveyId,
                answer,
                date: new Date()
            })
            return sucess(surveyResult)
        } catch (error) {
            return serverError(error)
        }
    }
}

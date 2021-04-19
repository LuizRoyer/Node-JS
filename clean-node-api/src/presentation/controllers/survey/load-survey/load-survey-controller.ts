import { serverError, noContent } from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadSurvey, sucess } from './load-survey-controller-protocols'

export class LoadSurveyController implements Controller {
    constructor (
        private readonly loadSurvey: LoadSurvey
    ) { }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const surveys = await this.loadSurvey.load()
            return surveys.length ? sucess(surveys) : noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

import { Router } from 'express'
import { SurveysController } from '../controllers/surveyController'

export default (router: Router): void => {
    const surveysController = new SurveysController()

    router.get('/surveys', surveysController.getAll)
    router.post('/surveys', surveysController.create)
}
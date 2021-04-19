import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { Router } from 'express'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeSaveSurveyResultController } from '../factories/survey-result/save-survey-result-controller-factory'
import { makeLoadSurveyResultController } from '../factories/survey-result/load-survey-result-controller-factory'

export default (router: Router): void => {
    const auth = adaptMiddleware(makeAuthMiddleware(''))
    router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
    router.get('/surveys/:surveyId/results', auth, adaptRoute(makeLoadSurveyResultController()))
}

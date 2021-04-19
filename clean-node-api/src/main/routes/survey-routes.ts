import { adaptMiddleware } from '@/main/adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '@/main/factories/middlewares/auth-middleware-factory'
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSurveyController } from '../factories/add-survey/add-survey-factory'
import { makeLoadSurveyController } from '../factories/load-surveys/load-survey-factory'

export default (router: Router): void => {
    const admAuth = adaptMiddleware(makeAuthMiddleware('admin'))
    const auth = adaptMiddleware(makeAuthMiddleware(''))
    router.post('/surveys', admAuth, adaptRoute(makeSurveyController()))
    router.get('/surveys', auth, adaptRoute(makeLoadSurveyController()))
}

import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSingUpController } from '../factories/singup/singup-factore'
import { makeLoginController } from '../factories/login/login-factory'

export default (router: Router): void => {
    router.post('/singup', adaptRoute (makeSingUpController()))
    router.post('/login', adaptRoute(makeLoginController()))
}

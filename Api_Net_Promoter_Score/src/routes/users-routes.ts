import { Router } from 'express'
import { UserController } from '../controllers/userController'

export default (router: Router): void => {
    const userController = new UserController()

    router.post('/users', userController.create)
}
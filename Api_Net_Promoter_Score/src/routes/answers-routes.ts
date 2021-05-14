import { Router } from 'express'
import { AnswerController } from '../controllers/answerController'

export default (router: Router): void => {
    const answerController = new AnswerController()

    router.get('/answers/:value',answerController.execute)
}

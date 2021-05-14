import { Router } from 'express';
import { SendEmailController } from "../controllers/sendEmailController"

export default (router: Router): void => {
    const sendEmailController = new SendEmailController()

    router.post('/sendEmail', sendEmailController.execute)
}
import { Router } from 'express';
import { NpsController } from "../controllers/npsController"

export default (router: Router): void => {
    const npsControllrt = new NpsController()

    router.get('/nps/:surveyId',npsControllrt.execute)
}
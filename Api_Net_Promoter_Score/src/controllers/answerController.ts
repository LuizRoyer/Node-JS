import { appError } from './../errors/appError';
import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import { SurveyUserRepository } from '../repositories/surveyUserRepository';

class AnswerController {

    async execute(req: Request, res: Response) {
        const { value } = req.params
        const { u } = req.query

        const surveyUserRepository = getCustomRepository(SurveyUserRepository)
        const surveyUser = await surveyUserRepository.findOne({ id: String(u) })

        if (!surveyUser) {
            throw new appError('Survey User does not exists')
        }

        surveyUser.value = Number(value);
        await surveyUserRepository.save(surveyUser)

        return res.json(surveyUser)
    }
}

export { AnswerController }
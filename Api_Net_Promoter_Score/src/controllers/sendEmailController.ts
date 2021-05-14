import { appError } from './../errors/appError';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/surveyRepository';
import { SurveyUserRepository } from '../repositories/surveyUserRepository';
import { UserRepository } from '../repositories/userRepository';
import sendEmailService from '../services/sendEmailService';
import { resolve } from 'path' //mape as pastas do projeto

class SendEmailController {

    async execute(req: Request, res: Response) {
        const { email, surveyId } = req.body;

        const userRepository = getCustomRepository(UserRepository);
        const serveyRepository = getCustomRepository(SurveysRepository)
        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const user = await userRepository.findOne({ email })
        if (!user) {
            throw new appError('User does not exists')
        }

        const survey = await serveyRepository.findOne({ id: surveyId })
        if (!survey) {
            throw new appError('Survey does not exists')
        }

        const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')
        const surveyUserExists = await surveyUserRepository.findOne({
            where: { userId: user.id, value: null },
            relations: ["user", "survey"]
        })

        let variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: '',
            link: process.env.URL_MAIL
        }

        if (surveyUserExists) {
            variables.id = surveyUserExists.id
            await sendEmailService.execute(email, survey.title, variables, npsPath)
            return res.json(surveyUserExists);
        }
        const surveyUser = surveyUserRepository.create({
            userId: user.id,
            surveyId: survey.id
        })
        await surveyUserRepository.save(surveyUser)
        variables.id = surveyUser.id
        await sendEmailService.execute(email, survey.title, variables, npsPath)

        return res.json(surveyUser);
    }
}

export { SendEmailController }
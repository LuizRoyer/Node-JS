import { getCustomRepository, Not , IsNull} from 'typeorm';
import { Request, Response } from 'express';
import { SurveyUserRepository } from '../repositories/surveyUserRepository';


class NpsController {

    async execute(req: Request, res: Response) {
        const { surveyId } = req.params
        const surverUserRepository = getCustomRepository(SurveyUserRepository)

        const surveysUsers = await surverUserRepository.find({
            surveyId,
            value:Not(IsNull())
        })

        const detractors = surveysUsers.filter((survey) => survey.value >= 0 && survey.value <= 6).length
        const promoters = surveysUsers.filter((survey) => survey.value >= 9).length
        const passives = surveysUsers.filter((survey) => survey.value >= 7 && survey.value <= 8).length
        const totalAnswers = surveysUsers.length

        const calculate = Number(((promoters - detractors) / totalAnswers) *100).toFixed(2)

        res.json({
            detractors,
            promoters,
            passives,
            totalAnswers,
            nps: calculate
        })

    }
}

export { NpsController }
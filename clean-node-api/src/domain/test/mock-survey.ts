import { AddSurveyParams } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { SurveyModel } from '@/presentation/controllers/survey/load-survey/load-survey-controller-protocols'

export const mockSurveyModel = (): SurveyModel => {
    return {
        id: 'any_id',
        question: 'any_question',
        answers: [{
            answer: 'any_answer'
        },
        {
            answer: 'other_answer',
            image: 'image 1'
        }
        ],
        date: new Date()
    }
}

export const mockSurveyModels = (): SurveyModel[] => {
    return [{
       id: 'any_id',
        question: 'any_question',
        answers: [{
            image: 'any_image',
            answer: 'any_answers'
        }],
        date: new Date()
    },
    {
        id: 'any_id1',
        question: 'any_question1',
        answers: [{
            image: 'any_image1',
            answer: 'any_answers1'
        }],
        date: new Date()
    }]
}

export const mockAddSurveyParams = (): AddSurveyParams => ({
    question: 'any_question',
    answers: [{
        image: 'any_image',
        answer: 'any_answers'
    }],
    date: new Date()
})

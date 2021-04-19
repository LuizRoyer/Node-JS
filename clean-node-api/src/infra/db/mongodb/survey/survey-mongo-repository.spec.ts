import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helpers'
import { SurveyMongoRepository } from './survey-mongo-repository'

let surveyCollection: Collection

const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
}

describe('survey Mongo Repository Add', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })
    beforeEach(async () => {
        surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.deleteMany({})
    })

    test('Should add a survey on sucess', async () => {
        const sut = makeSut()
        await sut.add({
            question: 'any_question',
            answers: [
                {
                    image: 'any_image',
                    answer: 'any_answer'
                },
                { answer: 'any_answer2' }
            ],
            date: new Date()
        })
        const survey = await surveyCollection.findOne({ question: 'any_question' })
        expect(survey).toBeTruthy()
    })

    describe('survey Mongo Repository Load All', () => {
        test('Should loadAll a survey on sucess', async () => {
            await surveyCollection.insertMany([
                {
                    question: 'any_question',
                    answers: [
                        {
                            image: 'any_image',
                            answer: 'any_answer'
                        }
                    ],
                    date: new Date()
                }, {
                    question: 'other_question',
                    answers: [
                        {
                            image: 'other_image',
                            answer: 'other_answer'
                        }
                    ],
                    date: new Date()
                }
            ])
            const sut = makeSut()
            const surveys = await sut.loadAll()
            expect(surveys.length).toBe(2)
            expect(surveys[0].id).toBeTruthy()
            expect(surveys[0].question).toBe('any_question')
            expect(surveys[1].question).toBe('other_question')
        })

        test('Should loadAll empty list', async () => {
            const sut = makeSut()
            const surveys = await sut.loadAll()
            expect(surveys.length).toBe(0)
        })
    })

    describe('survey Mongo Repository LoadById', () => {
        test('Should load Survey by id on sucess', async () => {
            const res = await surveyCollection.insertOne({
                question: 'any_question',
                answers: [
                    {
                        image: 'any_image',
                        answer: 'any_answer'
                    }
                ],
                date: new Date()
            })
            const sut = makeSut()
            const surveys = await sut.loadById(res.ops[0]._id)
            expect(surveys).toBeTruthy()
            expect(surveys.id).toBeTruthy()
        })
    })
})

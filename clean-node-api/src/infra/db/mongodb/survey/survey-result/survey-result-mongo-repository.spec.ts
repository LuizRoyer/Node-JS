import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { AccountModel } from '@/domain/models/account'
import { SurveyModel } from '@/domain/models/survey'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'
import { Collection, ObjectId } from 'mongodb'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
    return new SurveyResultMongoRepository()
}

const makeSurvey = async (): Promise<SurveyModel> => {
    const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [
            {
                image: 'any_image',
                answer: 'any_answer1'
            },
            {
                answer: 'outher_answer2'
            },
            { answer: 'outher_answer3' }
        ],
        date: new Date()
    })
    return MongoHelper.map(res.ops[0])
}

const makeAccount = async (): Promise<AccountModel> => {
    const res = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password'
    })
    return MongoHelper.map(res.ops[0])
}

describe('survey Result Mongo Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.deleteMany({})

        surveyResultCollection = await MongoHelper.getCollection('surveyResults')
        await surveyResultCollection.deleteMany({})

        accountCollection = await MongoHelper.getCollection('account')
        await accountCollection.deleteMany({})
    })
    describe('Save', () => {
        test('Should add a survey if its new', async () => {
            const survey = await makeSurvey()
            const account = await makeAccount()
            const sut = makeSut()

            await sut.save({
                surveyId: survey.id,
                accountId: account.id,
                answer: survey.answers[0].answer,
                date: new Date()
            })
            const surveyResult = await surveyResultCollection.findOne({
                surveyId: survey.id,
                accountId: account.id
            })
            expect(surveyResult).toBeTruthy()
        })

        test('Should update a survey if its not new', async () => {
            const survey = await makeSurvey()
            const account = await makeAccount()
            await surveyResultCollection.insertOne({
                surveyId: new ObjectId(survey.id),
                accountId: new ObjectId(account.id),
                answer: survey.answers[0].answer,
                date: new Date()
            })
            const sut = makeSut()
            await sut.save({
                surveyId: survey.id,
                accountId: account.id,
                answer: survey.answers[1].answer,
                date: new Date()
            })
            const surveyResult = await surveyResultCollection.find({
                surveyId: survey.id,
                accountId: account.id
            }).toArray()

            expect(surveyResult).toBeTruthy()
            expect(surveyResult.length).toBe(1)
        })
    })
    describe('LoadBySurveyId', () => {
        test('Should load survey result ', async () => {
            const survey = await makeSurvey()
            const account = await makeAccount()
            await surveyResultCollection.insertMany([{
                surveyId: new ObjectId(survey.id),
                accountId: new ObjectId(account.id),
                answer: survey.answers[0].answer,
                date: new Date()
            },
            {
                surveyId: new ObjectId(survey.id),
                accountId: new ObjectId(account.id),
                answer: survey.answers[0].answer,
                date: new Date()
            },
            {
                surveyId: new ObjectId(survey.id),
                accountId: new ObjectId(account.id),
                answer: survey.answers[1].answer,
                date: new Date()
            }])
            const sut = makeSut()
            const surveyResult = await sut.loadBySurveyId(survey.id)

            expect(surveyResult).toBeTruthy()
            expect(surveyResult.surveyId).toEqual(survey.id)
            expect(surveyResult.answers[0].count).toEqual(2)
            expect(surveyResult.answers[0].percent).toBe(50)
            expect(surveyResult.answers[1].count).toEqual(1)
            expect(surveyResult.answers[1].percent).toBe(100)
            expect(surveyResult.answers[2].count).toEqual(0)
            expect(surveyResult.answers[2].percent).toBe(0)
        })

        test('Should return null if thre is not survey result', async () => {
            const survey = await makeSurvey()
            const sut = makeSut()
            const surveyResult = await sut.loadBySurveyId(survey.id)

            expect(surveyResult).toBeNull()
        })
    })
})

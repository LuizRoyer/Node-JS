import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import { env } from 'process'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'
import app from '../config/app'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
    const res = await accountCollection.insertOne({
        name: 'Luiz',
        email: 'any.email@email.com',
        password: '123'
    })
    const id = res.ops[0]._id
    const accessToken = sign({ id }, env.jwtSecrect)
    await accountCollection.updateOne({ _id: id }, {
        $set: {
            accessToken
        }
    })
    return accessToken
}

describe('Survey Routes ', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })
    beforeEach(async () => {
        surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.deleteMany({})

        accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })
    describe('PUT / Surveys/:surveyId/result ', () => {
        test('Should return 403 on  save survey result without accessToken ', async () => {
            await request(app)
                .put('/api/surveys/any_id/results')
                .send({
                    answer: 'any_answer'
                })
                .expect(403)
        })
        test('Should return 200 on  save survey result with accessToken ', async () => {
            const accessToken = await makeAccessToken()
            const res = await surveyCollection.insertOne({
                question: 'Question',
                answers: [{
                    image: 'image 1',
                    answer: 'Answer 1'
                }],
                date: new Date()
            })
            const id: string = res.ops[0]._id
            await request(app)
                .put(`/api/surveys/${id}/results`)
                .set('x-access-token', accessToken)
                .send({
                    answer: 'Answer 1'
                })
                .expect(200)
        })
    })

    describe('Get / Surveys/:surveyId/result ', () => {
        test('Should return 403 on load survey result without accessToken ', async () => {
            await request(app)
                .get('/api/surveys/any_id/results')
                .expect(403)
        })
    })

    test('Should return 200 on load survey result with accessToken ', async () => {
        const accessToken = await makeAccessToken()
        const res = await surveyCollection.insertOne({
            question: 'Question',
            answers: [{
                image: 'image 1',
                answer: 'Answer 1'
            }],
            date: new Date()
        })
        const id: string = res.ops[0]._id
        await request(app)
            .get(`/api/surveys/${id}/results`)
            .set('x-access-token', accessToken)
            .expect(200)
    })
})

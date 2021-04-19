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
    describe('POST / Survey ', () => {
        test('Should return 403 on  survey  without accessToken ', async () => {
            await request(app).post('/api/surveys')
                .send({
                    question: 'Question',
                    answers: [{
                        image: 'image 1',
                        answer: 'Answer 1'
                    }]
                })
                .expect(403)
        })

        test('Should return 204 on  survey  with valid accessToken ', async () => {
          const accessToken = await makeAccessToken()
            await request(app).post('/api/surveys')
                .set('x-access-token', accessToken)
                .send({
                    question: 'Question',
                    answers: [{
                        image: 'image 1',
                        answer: 'Answer 1'
                    }]
                })
                .expect(204)
        })
    })

    describe('Get / Survey ', () => {
        test('Should return 403 on  load survey  without accessToken ', async () => {
            await request(app).get('/api/surveys')
                .expect(403)
        })

        test('Should return 204 on  survey  with valid accessToken ', async () => {
            const accessToken = await makeAccessToken()
            await request(app).get('/api/surveys')
            .set('x-access-token', accessToken)
                .expect(204)
        })
    })
})

import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'
import app from '../config/app'
import { hash } from 'bcrypt'
let accountCollection: Collection

describe('Login Routes ', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })
    beforeEach(async () => {
        accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })
    describe('POST / SingUp ', () => {
        test('Should return 200 on success ', async () => {
            await request(app).post('/api/singup')
                .send({
                    name: 'Luiz',
                    email: 'any.email@email.com',
                    password: '123',
                    passwordConfirmation: '123'
                })
                .expect(200)
            await request(app)
                .post('/api/singup')
                .send({
                    name: 'Luiz',
                    email: 'any.email@email.com',
                    password: '123',
                    passwordConfirmation: '123'
                })
                .expect(403)
        })
    })

    describe('POST / Login ', () => {
        test('Should return 200 on Login', async () => {
            const password = await hash('123', 12)
            await accountCollection.insertOne({
                name: 'Luiz',
                email: 'Luiz.Felipe@email.com',
                password: password,
                passwordConfirmation: password
            })
            await request(app).post('/api/login')
                .send({
                    email: 'Luiz.Felipe@email.com',
                    password: '123'
                })
                .expect(200)
        })

        test('Should return 401 on Login', async () => {
            await request(app).post('/api/login')
                .send({
                    email: 'Luiz.Felipe@email.com',
                    password: '123'
                })
                .expect(401)
        })
    })
})

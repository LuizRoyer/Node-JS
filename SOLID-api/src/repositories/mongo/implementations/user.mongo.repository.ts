import { MongoHelper } from './../mongo.helpers';
import { User } from './../../../entities/user';
import { IUserMongoRepository } from './../Iuser.mongo.repository';

export class UserMongoRepository implements IUserMongoRepository {

    async findByEmail(email: string): Promise<User> {
        const userCollection = await MongoHelper.getCollection('SOLIDUsers')
        const account = await userCollection.findOne({ email })
        return account && MongoHelper.map(account)
    }

    async save(user: User): Promise<void> {
        const userCollection = await MongoHelper.getCollection('SOLIDUsers')
        await userCollection.save(user)
    }
}
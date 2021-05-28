import { UserMongoRepository } from './../mongo/implementations/user.mongo.repository';
import { User } from '../../entities/user';
import { IUserRepository } from './../iuserrepository';

export class UserRespository implements IUserRepository {

    constructor(private UserMongoRepository: UserMongoRepository) { }

    async findByEmail(email: string): Promise<any> {

        this.UserMongoRepository.findByEmail(email)
    }

    async save(user: User): Promise<void> {
        this.UserMongoRepository.save(user)
    }

}
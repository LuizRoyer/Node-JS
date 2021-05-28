import { User } from './../../entities/user';

export interface IUserMongoRepository{

    findByEmail(email:string):Promise<User>
    save(user :User):Promise<void>
}
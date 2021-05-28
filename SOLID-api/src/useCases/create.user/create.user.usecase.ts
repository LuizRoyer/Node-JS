import { IMailProvider } from './../../providers/imail.provider';
import { User } from './../../entities/user';
import { ICreateUserRequest } from './create.user.dto';
import { IUserRepository } from './../../repositories/iuserrepository';

export class CreateUserUseCase {

    constructor(
        private userRepository: IUserRepository,
        private mailProvider: IMailProvider
    ) { }

    async execute(data: ICreateUserRequest) {

        const userExists = await this.userRepository.findByEmail(data.email)

        if (userExists) {
            throw new Error('User already exists')
        }

        const user = new User(data)

        await this.userRepository.save(user)

        await this.mailProvider.sendEmail({
            to: { name: data.name, email: data.email },
            from: { name: 'Api SOLID', email: 'api.solid@mail.com' },
            subject: ' Welcome to Api SOLID',
            body: 'You  already can do login your Website'
        })
    }
}
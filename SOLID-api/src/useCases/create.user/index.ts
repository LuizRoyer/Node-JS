import { CreateUserController } from './create.user.controller';
import { CreateUserUseCase } from './create.user.usecase';
import { UserRespository } from '../../repositories/implementations/user.repository';
import { MailTrapMailProvider } from './../../providers/implementations/mailtrap.mail.provider';

const mailTrapMailProvider = new MailTrapMailProvider()
const userRepository = new UserRespository()

const createUserUseCase = new CreateUserUseCase(
    userRepository,
    mailTrapMailProvider
)

const createUserController = new CreateUserController(createUserUseCase)

export { createUserController }
import { makeLoginValidation } from './login-validation-factore'
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import { Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers/login/login-controller'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { makeDbAuthentication } from '../usecases/accountadd-account/db-authentication-factory'

export const makeLoginController = (): Controller => {
    const loginController = new LoginController(makeLoginValidation(), makeDbAuthentication())
    const logMongorepository = new LogMongoRepository()
    return new LogControllerDecorator(loginController, logMongorepository)
}

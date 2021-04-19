import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { Controller } from '@/presentation/protocols/controller'
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import { SingUpController } from '@/presentation/controllers/singup/singup-controller'
import { makeSingUpValidation } from './singup-validation-factore'
import { makeDbAddAccount } from '../usecases/accountadd-account/db-add-account-factory'
import { makeDbAuthentication } from '../usecases/accountadd-account/db-authentication-factory'

export const makeSingUpController = (): Controller => {
    const singUpController = new SingUpController(makeDbAddAccount(), makeSingUpValidation(), makeDbAuthentication())
    const logMongorepository = new LogMongoRepository()
    return new LogControllerDecorator(singUpController, logMongorepository)
}

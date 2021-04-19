import { AddAccoutParams } from '@/domain/usecases/account/add-account'
import { AccountModel } from '@/domain/models/account'
import { AuthenticationParams } from '@/presentation/controllers/login/login-controller-protocols'

export const mockAccountModel = (): AccountModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password'
})
export const mockAddAccountParams = (): AddAccoutParams => ({
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password'
})

export const mockAuthentication = (): AuthenticationParams => ({
    email: 'any_email@email.com',
    password: 'any_password'
})

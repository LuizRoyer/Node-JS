import { AccountModel, AddAccountRepository, AddAccoutParams, LoadAccountByEmailRepository, UpdateAccessTokenRepositoy } from '@/data/usecases/account/add-account/db-add-account-protocols'
import { mockAccountModel } from '@/domain/test'
import { LoadAccountByTokenRepository } from '../db/account/load-account-by-token-repository'

export const mockAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
        async add (accountData: AddAccoutParams): Promise<AccountModel> {
            return await Promise.resolve(mockAccountModel())
        }
    }
    return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmail = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async loadByEmail (email: string): Promise<AccountModel> {
            const account = mockAccountModel()
            return await Promise.resolve(account)
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
    class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
        async loadByToken (token: string, role?: string): Promise<AccountModel> {
            return await Promise.resolve(mockAccountModel())
        }
    }
    return new LoadAccountByTokenRepositoryStub()
}

export const mockUpdateAccessTokenRepositoy = (): UpdateAccessTokenRepositoy => {
    class UpdateAccessTokenRepositoyStub implements UpdateAccessTokenRepositoy {
        async updateAccessToken (id: string, token: string): Promise<void> {
            return await Promise.resolve()
        }
    }
    return new UpdateAccessTokenRepositoyStub()
}

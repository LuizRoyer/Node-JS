import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { DbLoandAccountByToken } from './db-load-account-by-token'
import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { throwError, mockAccountModel } from '@/domain/test'
import { mockDecrypter, mockLoadAccountByTokenRepository } from '@/data/protocols/test'

type SutTypes = {
    sut: DbLoandAccountByToken
    decrypterStub: Decrypter
    loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
    const decrypterStub = mockDecrypter()
    const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepository()
    const sut = new DbLoandAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)
    return {
        sut,
        decrypterStub,
        loadAccountByTokenRepositoryStub
    }
}

describe('DBLoandAccountByToken UseCase', () => {
    test('Should call Decrypter with corrects values', async () => {
        const { sut, decrypterStub } = makeSut()
        const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')

        await sut.load('any_token', 'any_role')
        expect(decryptSpy).toHaveBeenCalledWith('any_token')
    })

    test('Should return null if Decrypter return null', async () => {
        const { sut, decrypterStub } = makeSut()
        jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null))

        const account = await sut.load('any_token', 'any_role')
        expect(account).toBeNull()
    })

    test('Should call LoadAccountByTokenrepository with corrects values', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = makeSut()
        const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')

        await sut.load('any_token', 'any_role')
        expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
    })

    test('Should return null if LoadAccountByTokenrepository return null', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = makeSut()
        jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(Promise.resolve(null))

        const account = await sut.load('any_token', 'any_role')
        expect(account).toBeNull()
    })

    test('Should return null if LoadAccountByTokenrepository return null', async () => {
        const { sut } = makeSut()

        const account = await sut.load('any_token', 'any_role')
        expect(account).toEqual(mockAccountModel())
    })

    test('Should throws if Decrypter throws', async () => {
        const { sut, decrypterStub } = makeSut()
        jest.spyOn(decrypterStub, 'decrypt')
            .mockImplementationOnce(throwError)
        const promise = sut.load('any_token', 'any_role')
        await expect(promise).rejects.toThrowError()
    })

    test('Should throws if LoadAccountByTokenrepository throws', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = makeSut()

        jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
            .mockImplementationOnce(throwError)
        const promise = sut.load('any_token', 'any_role')
        await expect(promise).rejects.toThrowError()
    })
})

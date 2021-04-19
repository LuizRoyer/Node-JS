import { mockHasher } from '@/data/protocols/test/mock-criptography'
import { mockAccountModel, mockAddAccountParams, throwError } from '@/domain/test'
import { Hasher, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'
import { mockAccountRepository, mockLoadAccountByEmail } from '@/data/protocols/test'

type SutTypes = {
    sut: DbAddAccount
    hasherStub: Hasher
    addAccountRepositoryStub: AddAccountRepository
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}
const makeSut = (): SutTypes => {
    const hasherStub = mockHasher()
    const loadAccountByEmailRepositoryStub = mockLoadAccountByEmail()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValue(Promise.resolve(null))
    const addAccountRepositoryStub = mockAccountRepository()

    const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
    return {
        sut,
        hasherStub,
        addAccountRepositoryStub,
        loadAccountByEmailRepositoryStub
    }
}
describe('DBAddAccount UseCase', () => {
    test('Should call Encrypter with correct password', async () => {
        const { sut, hasherStub } = makeSut()
        const encriptSpy = jest.spyOn(hasherStub, 'hash')

        await sut.add(mockAddAccountParams())
        expect(encriptSpy).toHaveBeenCalledWith('any_password')
    })
    test('Should throw if Encrypter throws', async () => {
        const { sut, hasherStub } = makeSut()
        jest.spyOn(hasherStub, 'hash')
            .mockImplementationOnce(throwError)

        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

        await sut.add(mockAddAccountParams())
        expect(addSpy).toHaveBeenCalledWith({
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password'
        })
    })
    test('Should throw if AddAccountRepository throws', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        jest.spyOn(addAccountRepositoryStub, 'add')
            .mockImplementationOnce(throwError)

        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow()
    })
    test('Should return an account if on sucess', async () => {
        const { sut } = makeSut()
        const account = await sut.add(mockAddAccountParams())
        expect(account).toEqual(mockAccountModel())
    })

    test('Should call LoadAccoountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')

        await sut.add(mockAddAccountParams())
        expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
    })

    test('Should return null if LoadAccoountByEmailRepository not returns null', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccountModel()))
        const account = await sut.add(mockAddAccountParams())
        expect(account).toBeNull()
    })
})

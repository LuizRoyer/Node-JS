import { mockEncrypter, mockHashComparer, mockLoadAccountByEmail, mockUpdateAccessTokenRepositoy } from '@/data/protocols/test'
import { mockAuthentication, throwError } from '@/domain/test'
import { DbAuthentication } from './db-authentication'
import {
    LoadAccountByEmailRepository,
    HashComparer,
    Encrypter,
    UpdateAccessTokenRepositoy
} from './db-authentication-protocols'

type SutTypes = {
    sut: DbAuthentication
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
    hashComparerStub: HashComparer
    encrypterStub: Encrypter
    updateAccessTokenRepositoryStub: UpdateAccessTokenRepositoy
}

const makeSut = (): SutTypes => {
    const loadAccountByEmailRepositoryStub = mockLoadAccountByEmail()
    const hashComparerStub = mockHashComparer()
    const encrypterStub = mockEncrypter()
    const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepositoy()
    const sut = new DbAuthentication(
        loadAccountByEmailRepositoryStub,
        hashComparerStub,
        encrypterStub,
        updateAccessTokenRepositoryStub)

    return {
        sut,
        loadAccountByEmailRepositoryStub,
        hashComparerStub,
        encrypterStub,
        updateAccessTokenRepositoryStub
    }
}

describe('DBAuthentication UseCase', () => {
    test('Should call LoadAccoountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')

        await sut.auth(mockAuthentication())
        expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
    })

    test('Should throw if LoadAccoountByEmailRepository throws', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
            .mockImplementationOnce(throwError)

        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if LoadAccoountByEmailRepository returns null', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)

        const accesToken = await sut.auth(mockAuthentication())
        expect(accesToken).toBeNull()
    })

    test('Should call HashCompare with correct values', async () => {
        const { sut, hashComparerStub } = makeSut()
        const compareSpy = jest.spyOn(hashComparerStub, 'compare')

        await sut.auth(mockAuthentication())
        expect(compareSpy).toHaveBeenCalledWith('any_password', 'any_password')
    })

    test('Should throw if HashCompare throws', async () => {
        const { sut, hashComparerStub } = makeSut()
        jest.spyOn(hashComparerStub, 'compare')
            .mockImplementationOnce(throwError)

        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if hashComparerStub returns false', async () => {
        const { sut, hashComparerStub } = makeSut()
        jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(Promise.resolve(false))

        const accesToken = await sut.auth(mockAuthentication())
        expect(accesToken).toBeNull()
    })

    test('Should call TokenGenerator with correct id', async () => {
        const { sut, encrypterStub } = makeSut()
        const generateSpy = jest.spyOn(encrypterStub, 'encrypt')

        await sut.auth(mockAuthentication())
        expect(generateSpy).toHaveBeenCalledWith('any_id')
    })

    test('Should throw if TokenGenerator throws', async () => {
        const { sut, encrypterStub } = makeSut()
        jest.spyOn(encrypterStub, 'encrypt')
            .mockImplementationOnce(throwError)

        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow()
    })

    test('Should call TokenGenerator with correct id with returns Token', async () => {
        const { sut } = makeSut()

        const accessToken = await sut.auth(mockAuthentication())
        expect(accessToken).toBe('any_token')
    })

    test('Should call UpdateAcessTokenRepositiry with correct values', async () => {
        const { sut, updateAccessTokenRepositoryStub } = makeSut()
        const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')

        await sut.auth(mockAuthentication())
        expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
    })
    test('Should throw if UpdateAcessTokenRepositiry throws', async () => {
        const { sut, updateAccessTokenRepositoryStub } = makeSut()
        jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
            .mockImplementationOnce(throwError)

        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow()
    })
})

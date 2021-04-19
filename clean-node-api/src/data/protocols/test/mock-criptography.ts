import { Encrypter, HashComparer, Hasher } from '@/data/usecases/account/add-account/db-add-account-protocols'
import { Decrypter } from '@/data/protocols/criptography/decrypter'

export const mockHasher = (): Hasher => {
    class EncrypterStub implements Hasher {
        async hash (value: string): Promise<string> {
            return await Promise.resolve('any_password')
        }
    }
    return new EncrypterStub()
}

export const mockDecrypter = (): Decrypter => {
    class DecrypterStub implements Decrypter {
        async decrypt (value: string): Promise<string> {
            return await Promise.resolve('any_value')
        }
    }
    return new DecrypterStub()
}

export const mockEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt (id: string): Promise<string> {
            return await Promise.resolve('any_token')
        }
    }
    return new EncrypterStub()
}

export const mockHashComparer = (): HashComparer => {
    class HashComparerStub implements HashComparer {
        async compare (value: string, hash: string): Promise<boolean> {
            return await Promise.resolve(true)
        }
    }
    return new HashComparerStub()
}

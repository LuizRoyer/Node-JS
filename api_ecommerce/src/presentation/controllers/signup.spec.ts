import { InvalidParamError } from '../errors/Invalid-param-error'
import { MissingParamError } from './../errors/missing-param-error'
import { SignUpController } from './signupController'

const makeSut = (): SignUpController => {
    class EmailValidatorStub {
        isValid(email: string): boolean {
            return true
        }
    }
    const emailValidatorStub = new EmailValidatorStub()
    return new SignUpController(emailValidatorStub)
}

describe('SignUp Controller', () => {
    test('Should return 400 if no name is provided', () => {
        const sut = makeSut()
        const httpRequest = {
            body: {
                // name:'any_nome',
                emai: 'any_email@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResonse = sut.handle(httpRequest)
        expect(httpResonse.statusCode).toBe(400)
        expect(httpResonse.body).toEqual(new MissingParamError('name'))
    })
    test('Should return 400 if no email is provided', () => {
        const sut = makeSut()
        const httpRequest = {
            body: {
                name: 'any_nome',
                //emai: 'any_email@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResonse = sut.handle(httpRequest)
        expect(httpResonse.statusCode).toBe(400)
        expect(httpResonse.body).toEqual(new MissingParamError('email'))
    })
    test('Should return 400 if no password is provided', () => {
        const sut = makeSut()
        const httpRequest = {
            body: {
                name: 'any_nome',
                email: 'any_email@email.com',
                //password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResonse = sut.handle(httpRequest)
        expect(httpResonse.statusCode).toBe(400)
        expect(httpResonse.body).toEqual(new MissingParamError('password'))
    })

    test('Should return 400 if no passwordConfirmation is provided', () => {
        const sut = makeSut()
        const httpRequest = {
            body: {
                name: 'any_nome',
                email: 'any_email@email.com',
                password: 'any_password',
                // passwordConfirmation: 'any_password'
            }
        }
        const httpResonse = sut.handle(httpRequest)
        expect(httpResonse.statusCode).toBe(400)
        expect(httpResonse.body).toEqual(new MissingParamError('passwordConfirmation'))
    })

    test('Should return 400 if an invalid email is provided', () => {
        const sut = makeSut()
        const httpRequest = {
            body: {
                name: 'any_nome',
                email: 'invalid_email@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResonse = sut.handle(httpRequest)
        expect(httpResonse.statusCode).toBe(400)
        expect(httpResonse.body).toEqual(new InvalidParamError('email'))
    })
})
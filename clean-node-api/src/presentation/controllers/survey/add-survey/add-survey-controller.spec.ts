import MockDate from 'mockdate'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helper'
import { HttpRequest, AddSurvey, Validation } from './add-survey-controller-protocols'
import { AddSurveyController } from './add-survey-controller'
import { throwError } from '@/domain/test'
import { mockAddSurveyStub, mockValidation } from '@/presentation/test'

const mockRequest = (): HttpRequest => ({
    body: {
        question: 'any_question',
        answers: [{
            image: 'any_image',
            answers: 'any_answer'
        }],
        date: new Date()
    }
})

type SutTypes = {
    sut: AddSurveyController
    validationStub: Validation
    addSurveyStub: AddSurvey
}
const makeSut = (): SutTypes => {
    const validationStub = mockValidation()
    const addSurveyStub = mockAddSurveyStub()
    const sut = new AddSurveyController(validationStub, addSurveyStub)
    return {
        sut,
        validationStub,
        addSurveyStub
    }
}
describe('AddSurvey Controller', () => {
    beforeAll(() => { // Mockar a data
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call validation with corrct values ', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = mockRequest()
        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    test('Should returns 400 if validation fails ', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())

        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(badRequest(new Error()))
    })

    test('Should call addSurvey with corrct values ', async () => {
        const { sut, addSurveyStub } = makeSut()
        const addSpy = jest.spyOn(addSurveyStub, 'add')
        const httpRequest = mockRequest()
        await sut.handle(httpRequest)
        expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    test('Should returns 500 if addSurvey throws ', async () => {
        const { sut, addSurveyStub } = makeSut()
        jest.spyOn(addSurveyStub, 'add').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should returns 204 on sucess ', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(noContent())
    })
})

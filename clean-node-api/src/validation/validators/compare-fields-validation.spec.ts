import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldValidation } from './compare-field-validation'

const makeSut = (): CompareFieldValidation => {
    return new CompareFieldValidation('field', 'fieldToName')
}
describe('CompareFields Validation ', () => {
    test('Should return a InvalidParamError if validation fails', () => {
        const sut = makeSut()
        const error = sut.validate({
            field: 'any_value',
            fieldToName: 'any_value_wrong'
        })
        expect(error).toEqual(new InvalidParamError('fieldToName'))
    })

    test('Should not return if validation sucess', () => {
        const sut = makeSut()
        const error = sut.validate({
            field: 'any_value',
            fieldToName: 'any_value'
        })
        expect(error).toBeFalsy() // não pode ter valor
    })
})

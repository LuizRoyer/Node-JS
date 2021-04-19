import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { Validation } from '@/presentation/protocols/validation'

export class CompareFieldValidation implements Validation {
    constructor (
        private readonly fieldName: string,
        private readonly fieldCompareName: string) { }

    validate (input: any): Error {
        if (input[this.fieldName] !== input[this.fieldCompareName]) {
            return new InvalidParamError(this.fieldCompareName)
        }
    }
}

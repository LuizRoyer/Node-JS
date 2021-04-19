import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeSurveyValidation } from './add-survey-validation-factore'

jest.mock('@/validation/validators/validation-composite')

describe('AddSurvey Validation Factory', () => {
    test('Should call validationComposite with all validations ', () => {
        makeSurveyValidation()

        const validations: Validation[] = []
        for (const field of ['question', 'answers']) {
            validations.push(new RequiredFieldValidation(field))
        }

        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})

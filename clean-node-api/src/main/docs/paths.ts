import {
    loginPath,
    surveyPath,
    signUpPath,
    surveyResultPath
} from './paths/'

export default {
    '/login': loginPath,
    '/singup': signUpPath,
    '/surveys': surveyPath,
    '/surveys/{surveyId}/results': surveyResultPath
}

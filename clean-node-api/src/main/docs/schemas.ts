import {
    loginParamSchema,
    accountSchema,
    errorSchema,
    surveySchema,
    surveyAnswerSchema,
    surveysSchema,
    signUpParamSchema,
    addSurveyParamsSchema,
    saveSurveyParamsSchema,
    surveyResultSchema,
    surveyResultAnswerSchema
} from './schemas/'

export default {
    account: accountSchema,
    loginParams: loginParamSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    signUpParams: signUpParamSchema,
    addSurveyParams: addSurveyParamsSchema,
    saveSurveyParams: saveSurveyParamsSchema,
    surveyResult: surveyResultSchema,
    surveyResultAnswerSchema: surveyResultAnswerSchema
}

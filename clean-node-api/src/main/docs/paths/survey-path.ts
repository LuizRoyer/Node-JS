export const surveyPath = {
    get: {
        security: [{
            apiKeyAuth: []
        }],
        tags: ['Enquete'],
        summary: 'Api para listar todas as Enquetes',
        responses: {
            200: {
                description: 'Sucesso',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/surveys'
                        }
                    }
                }
            },
            403: {
                $ref: '#/components/forbidden'
            },
            404: {
                description: 'Api não encontrada'
            },
            500: {
                $ref: '#/components/serverError'
            }
        }
    },
    post: {
        security: [{
            apiKeyAuth: []
        }],
        tags: ['Enquete'],
        summary: 'Api para criar uma Enquete',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/addSurveyParams'
                    }
                }
            }
        },
        responses: {
            204: {
                description: 'Sucesso'
            },
            403: {
                $ref: '#/components/forbidden'
            },
            404: {
                description: 'Api não encontrada'
            },
            500: {
                $ref: '#/components/serverError'
            }
        }
    }
}


export const signUpPath = {
    post: {
        tags: ['Login'],
        sumary: 'API para criar conta de um usuarios',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/signUpParams'
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'Sucesso',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/account'
                        }
                    }
                }
            },
            400: {
                $ref: '#/components/badRequest'
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

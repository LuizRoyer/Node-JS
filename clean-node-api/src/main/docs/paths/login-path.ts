
export const loginPath = {
    post: {
        tags: ['Login'],
        sumary: 'API para autenticar usuarios',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/loginParams'
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
            401: {
                $ref: '#/components/unauthorized'
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

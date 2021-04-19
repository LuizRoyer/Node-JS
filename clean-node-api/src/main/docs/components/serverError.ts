export const serverError = {
    description: 'Erro interno Contate a Infra',
    content: {
        'application/json': {
            schema: {
                $ref: '#/schemas/error'
            }
        }
    }
}

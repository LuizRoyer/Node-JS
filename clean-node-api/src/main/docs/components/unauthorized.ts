export const unauthorized = {
    description: 'Password Inválido',
    content: {
        'application/json': {
            schema: {
                $ref: '#/schemas/error'
            }
        }
    }
}

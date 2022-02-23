'use strict'

const router = [
    {
        method: 'GET',
        path: '/',
        handler: (req, res) => {
            return 'Hello World!';
        }
    },
    {
        method: 'POST',
        path: '/user',
        handler: (req, res) => {
            return (`Olá ${req.payload.name}`)
        }
    }
]

module.exports = router
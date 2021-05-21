import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {


    const redis = require('promise-redis')()
    const client = redis.createClient()

    //SET
    let result = await client.set('chave', 'valor')

    // result += await client.set('chave1','valor1','EX',60) // Configurar em quanto tempo expora a memiria , em segundos
    console.log(result)

    // GET
    const valor = await client.get('chave1')

    res.json({ chave: valor })

}
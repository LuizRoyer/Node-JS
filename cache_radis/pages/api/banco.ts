import { NextApiRequest, NextApiResponse } from "next";
import connection from "../../infra/db/mysql/connection";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const redis = require('promise-redis')();
    const client = redis.createClient();

    const idPessoa = 1
    let pessoa = await client.get(`${idPessoa}`)

    if (!pessoa) {

        const sqlQuery = 'select * from pessoa'
        var pessoas = await connection(sqlQuery);
        
        for (let i = 0; i < 16; i++) {           
            await client.set(`${pessoas[i].idpessoa}`, JSON.stringify(pessoas[i]), 'EX', 6)
        }

    } else {
        pessoa = JSON.parse(pessoa)
    }

    let result = JSON.parse(await client.get(`${idPessoa}`))
    res.json({ result })

}




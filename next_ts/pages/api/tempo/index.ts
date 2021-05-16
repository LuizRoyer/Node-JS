import { NextApiResponse, NextApiRequest } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const woeid = process.env.WOEID;
    const dynamicDate = new Date();

    const weatherResponse = await fetch(`https://api.hgbrasil.com/weather?woeid=${woeid}`)
    const weatherJson = await weatherResponse.json();

    //Mantem as informações em cache e atualiza a cada 10 segundos
    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')

    res.json({
        date: dynamicDate.toUTCString(),
        weather: weatherJson
    })
}
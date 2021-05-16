import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const  id = req.query.id
    const fetchedData: AxiosResponse = await axios
                    .get(`https://jsonplaceholder.typicode.com/users/${id}`)
    const users = fetchedData.data;
    res.status(200).json({ users })
}
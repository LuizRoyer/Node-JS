import { NextApiRequest, NextApiResponse } from "next"
import axios, { AxiosResponse } from "axios"


export default async (req: NextApiRequest, res: NextApiResponse) => {
 
    switch(req.method){
        case 'GET':{
            const fetchedData: AxiosResponse = await axios.get("https://jsonplaceholder.typicode.com/users")
            const users = fetchedData.data;
            res.status(200).json({ users })
            break;
        }
        case 'POST':{
            res.status(201).json({
                message:" user create with sucess"
            })
        }
    }

}


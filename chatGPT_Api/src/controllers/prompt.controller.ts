import OpenAI from '../config/openai'
import { Request, Response } from 'express'


export default {
    async sendText(req: Request, res: Response) {

        const openAIApi = OpenAI.configuration()
        try {
            const response = await openAIApi.createCompletion(
                OpenAI.textCompletion(req.body)
            )
            console.log(response)
            return res.status(200).json({ data: response.data.choices[0].text })

        } catch (error) {     
            return res.status(400).json({ data: error || "Error" })
        }

    }
}

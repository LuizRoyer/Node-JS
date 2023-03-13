import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv'

dotenv.config()

export default class openAI {
    static configuration() {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY?.trim(),
        })

        return new OpenAIApi(configuration)
    }

    static textCompletion(prompt: any) {
        return {
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 2,
            stop: [" Human:", " AI:"]
        }
    }
}

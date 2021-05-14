import nodemailer, { getTestMessageUrl, Transporter } from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'

class SendMailServices {
    private client: Transporter

    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            })
            this.client = transporter
        })
    }

    async execute(to: string, subject: string, variables: object, path:string) {
      
       const templateFileContent = fs.readFileSync(path).toString('utf-8')
       
      const mailtemplateParse= handlebars.compile(templateFileContent)
      const html =mailtemplateParse(variables) 

       const message = await this.client.sendMail({
            to,
            subject,
            html: html,
            from: 'NPS <noreplay@nps.com.br>'
        })
        console.log('Message sent:', message.messageId)
        console.log('preview URL:', nodemailer,getTestMessageUrl(message))
    }

}

export default new SendMailServices();
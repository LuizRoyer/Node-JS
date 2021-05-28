import { IMailProvider, IMessage } from './../imail.provider';
import nodemailer from 'nodemailer'

export class MailTrapMailProvider implements IMailProvider {

    constructor(
        private transporter = nodemailer.createTransport({
            host: process.env.HOSTMAILTRAP,
            port: process.env.PORTEMAILTRAP,
            auth: {
                user: process.env.USEREMAILTRAP,
                pass: process.env.PASSMAILTRAP
            }
        })
    ) { }

    async sendEmail(message: IMessage): Promise<void> {
        await this.transporter.sendEmail({
            to: {
                name: message.to.name,
                address: message.to.email
            },
            from: {
                name: message.from.name,
                address: message.from.email
            },
            subject: message.subject,
            html: message.body
        })
    }
}
import EmailNotification from "../email-notification";
//import LocalNotification from "../local-notification";
import NotificationSender from "../notification-sender";
import nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";

export default class SmtpNodeMailerNotificationSender extends NotificationSender {
    async send(notification: EmailNotification): Promise<any> {        
        let testAccount = await nodemailer.createTestAccount();

        var smtpTransport = nodemailer.createTransport({
            host: process.env.SMTP_SERVER,
            port: parseInt(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE.toLowerCase() === 'true', // true for 465, false for other ports
            auth: {
              user: process.env.SMTP_USERNAME, // generated ethereal user
              pass: process.env.SMTP_PASSWORD, // generated ethereal password
            },
          });
        const result = await new Promise<SMTPTransport.SentMessageInfo>((resolve, reject) => {
            smtpTransport.sendMail({ ...notification, from: process.env.FROM_EMAIL }, function (error, response) {
                if (error)
                    reject(error);
                else
                    resolve(response);
            });
        });
        console.debug(`nodemailer result: \n${JSON.stringify(result, null, 4)}`);
        return result;
    }
}
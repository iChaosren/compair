import EmailNotification from "../email-notification";
//import LocalNotification from "../local-notification";
import NotificationSender from "../notification-sender";
import nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";

export default class GmailNodeMailerNotificationSender extends NotificationSender {
    async send(notification: EmailNotification): Promise<any> {        
        var smtpTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_FROM_EMAIL,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });
        const result = await new Promise<SMTPTransport.SentMessageInfo>((resolve, reject) => {
            smtpTransport.sendMail({
                from: process.env.GMAIL_FROM_EMAIL,
                to: notification.to,
                subject: notification.subject,
                html: notification.body
            }, function (error, response) {
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
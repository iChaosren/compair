import EmailNotification from "../email-notification";
//import LocalNotification from "../local-notification";
import NotificationSender from "../notification-sender";
import nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";

export default class GmailNodeMailerNotificationSender extends NotificationSender {
    async send(notification: EmailNotification): Promise<void> {
        var smtpTransport = nodemailer.createTransport("SMTP", {
            service: "Gmail",
            auth: {
                user: process.env.GMAIL_FROM_EMAIL,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });
        const result = await new Promise<SMTPTransport.SentMessageInfo>((resolve, reject) => {
            smtpTransport.sendMail(notification, function (error, response) {
                if (error)
                    reject(error);
                else
                    resolve(response);
            });
        });
        console.log(`nodemailer result: \n${JSON.stringify(result, null, 4)}`);
    }
}
import GmailNodeMailerNotificationSender from "../worker/notifications/adapters/gmail-nodemailer";
import EmailNotification from "../worker/notifications/email-notification";
import Site from "./site";

export type RecipientType = "local-notification" | "email-notification";

export default class Recipient {
    type: RecipientType;
    email?: string;

    async notify(site: Site) {
        if (this.type === "local-notification") {
            // send local notification
            throw new Error("[local-notification] - Not implemented yet");
        } else if (this.type === "email-notification") {
            // send email
            const notification : EmailNotification = {
                to: [this.email],
                subject: `${site.name} has changed`,
                body: `${site.name} has changed, visit: ${site.url}`
            };
            await new GmailNodeMailerNotificationSender().send(notification);
        }
    }
}
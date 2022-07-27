import EmailNotification from "./email-notification";
import LocalNotification from "./local-notification";

abstract class NotificationSender {
    abstract send(notification: LocalNotification | EmailNotification): Promise<any>;
}

export default NotificationSender;
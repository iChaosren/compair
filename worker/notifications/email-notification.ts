
export default interface EmailNotification {
    to: string[];
    cc?: string[];
    bcc?: string[];
    subject: string;
    body: string;
}
import fs from 'fs';
import { SESv2Client, SendEmailCommand, SendEmailCommandInput } from "@aws-sdk/client-sesv2";
import AWSConfig from '../../types/aws-global-config';

type SendEmailInfo = {
    to: string[];
    subject: string;
    body: string;
}

const buildEmail = (email: SendEmailInfo): SendEmailCommandInput => ({
    Content: {
        Simple: {
            Body: { Text: { Data: email.body } },
            Subject: { Data: email.subject }
        }
    },
    ...(
        AWSConfig.ses.fromEmailArn ?
            { FromEmailAddressIdentityArn: AWSConfig.ses.fromEmailArn }
            :
            { FromEmailAddress: AWSConfig.ses.fromEmail }
    ),
    Destination: {
        ToAddresses: email.to
    }
})

export const sendEmailAsync = async (email: SendEmailInfo) => {
    const sesClient = new SESv2Client(AWSConfig);
    const command = new SendEmailCommand(buildEmail(email))
    await sesClient.send(command);
}

export const sendEmail = (email: SendEmailInfo) => {
    const sesClient = new SESv2Client(AWSConfig);
    const command = new SendEmailCommand(buildEmail(email))
    sesClient.send(command)
        .then((data) => {
            console.log(`Email Sent Successfully\n${JSON.stringify(email, null, 4)}`)
        })
        .catch((e) => {
            console.error(`Email Failed\n${JSON.stringify(e, null, 4)}`);
        });
}

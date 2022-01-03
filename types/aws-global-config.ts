
import { SESv2ClientConfig } from '@aws-sdk/client-sesv2';
import _config from '../aws.config.json';

export type AWSConfiguration = {
    ses?: SESv2ClientConfig & { fromEmailArn?: string, fromEmail?: string };
}

const AWSConfig: AWSConfiguration = _config;
export default AWSConfig;
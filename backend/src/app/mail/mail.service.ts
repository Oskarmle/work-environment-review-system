import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import FormData from 'form-data';

interface MessagesSendResult {
  id: string;
  message: string;
  status?: number;
}

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

interface MailgunMessageData {
  from: string;
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  [key: string]: unknown;
}

interface MailgunClient {
  messages: {
    create: (
      domain: string,
      data: MailgunMessageData,
    ) => Promise<MessagesSendResult>;
  };
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private mailgunClient: MailgunClient;
  private initialized = false;

  constructor(private readonly config: ConfigService) {
    void this.initializeMailgun();
  }

  private async initializeMailgun() {
    const Mailgun = (await import('mailgun.js')).default;
    const mailgun = new Mailgun(FormData);
    const domain = process.env.MAILGUN_DOMAIN;
    const apiKey = process.env.MAILGUN_API_KEY;

    if (!apiKey || !domain) {
      this.logger.warn('Mailgun credentials not configured');
    }

    this.mailgunClient = mailgun.client({
      username: 'api',
      key: apiKey || '',
    }) as MailgunClient;
    this.initialized = true;
  }

  private async ensureInitialized() {
    if (!this.initialized) {
      await this.initializeMailgun();
    }
  }

  async sendEmail(options: EmailOptions): Promise<MessagesSendResult> {
    await this.ensureInitialized();

    const domain = this.config.get<string>('MAILGUN_DOMAIN');
    if (!domain) {
      throw new Error('MAILGUN_DOMAIN is not configured');
    }

    const from = process.env.MAILGUN_FROM_EMAIL || `noreply@${domain}`;

    try {
      const response = await this.mailgunClient.messages.create(domain, {
        from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });

      this.logger.log('Email sent successfully:', response);
      return response;
    } catch (error) {
      this.logger.error('Failed to send email:', error);
      throw error;
    }
  }

  async sendSimpleEmail(
    to: string,
    subject: string,
    message: string,
  ): Promise<MessagesSendResult> {
    return this.sendEmail({
      to,
      subject,
      text: message,
    });
  }
}

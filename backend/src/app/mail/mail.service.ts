import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import FormData from 'form-data';
import {
  EmailOptions,
  MailgunClient,
  MessagesSendResult,
} from 'src/types/mail';

@Injectable()
export class MailService implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);
  private mailgunClient: MailgunClient;
  private readonly domain: string;
  private readonly from: string;
  private initPromise: Promise<void>;

  constructor(private readonly config: ConfigService) {
    const apiKey = this.config.get<string>('MAILGUN_API_KEY');
    this.domain = this.config.get<string>('MAILGUN_DOMAIN')!;

    if (!apiKey || !this.domain) {
      throw new Error('MAILGUN_API_KEY and MAILGUN_DOMAIN must be configured');
    }

    this.from =
      this.config.get<string>('MAILGUN_FROM_EMAIL') || `noreply@${this.domain}`;

    this.initPromise = this.initializeMailgun(apiKey);
  }

  async onModuleInit() {
    await this.initPromise;
  }

  private async initializeMailgun(apiKey: string) {
    const Mailgun = (await import('mailgun.js')).default;
    const mailgun = new Mailgun(FormData);
    this.mailgunClient = mailgun.client({
      username: 'api',
      key: apiKey,
    }) as MailgunClient;
    this.logger.log('Mailgun client initialized');
  }

  async sendEmail(options: EmailOptions): Promise<MessagesSendResult> {
    await this.initPromise;

    try {
      const response = await this.mailgunClient.messages.create(this.domain, {
        from: this.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachment: options.attachment,
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

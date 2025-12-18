import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

interface MessagesSendResult {
  id: string;
  message: string;
  status?: number;
}

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-test')
  async sendTestEmail(
    @Body() body: { to: string; subject?: string; message?: string },
  ): Promise<MessagesSendResult> {
    const {
      to,
      subject = 'Test Email',
      message = 'This is a test email from Mailgun!',
    } = body;

    return this.mailService.sendSimpleEmail(to, subject, message);
  }
}

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

import IEmailMessage from 'src/interfaces/IEmailMessage';
import { MailService } from './mail.service';

@Injectable()
export class MailServiceImpl implements MailService {
  private readonly transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD,
      },
    });
  }

  private initEmailMessage({ to, subject, html }: IEmailMessage) {
    return {
      from: process.env.SENDER_EMAIL,
      to,
      subject,
      text: subject,
      html,
    };
  }

  async sendEmailMessage(emailInformation: IEmailMessage) {
    if (process.env.SENDER_EMAIL !== undefined) {
      await this.transporter.sendMail(this.initEmailMessage(emailInformation));
    }
  }
}

import IEmailMessage from 'src/interfaces/IEmailMessage';

export interface MailService {
  sendEmailMessage(emailInformation: IEmailMessage): void;
}

export const MailService = Symbol('MailService');

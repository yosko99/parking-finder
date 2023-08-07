interface IEmailMessage {
  from?: string;
  to: string | string[];
  subject: string;
  html: string;
}

export default IEmailMessage;

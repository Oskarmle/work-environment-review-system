export type MessagesSendResult = {
  id: string;
  message: string;
  status?: number;
};

export type EmailOptions = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

// FIXME: add attachment support
export type MailgunMessageData = {
  from: string;
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  [key: string]: unknown;
};

export type MailgunClient = {
  messages: {
    create: (
      domain: string,
      data: MailgunMessageData,
    ) => Promise<MessagesSendResult>;
  };
};

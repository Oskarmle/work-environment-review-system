import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { EmailOptions, MessagesSendResult } from 'src/types/mail';

describe('MailService', () => {
  let service: MailService;
  let configService: ConfigService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const config = {
        MAILGUN_API_KEY: 'test-api-key',
        MAILGUN_DOMAIN: 'test-domain.com',
        MAILGUN_FROM_EMAIL: 'test@test-domain.com',
      };
      return config[key];
    }),
  };

  const mockMailgunClient = {
    messages: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
    configService = module.get<ConfigService>(ConfigService);
    
    // Inject mock client
    service['mailgunClient'] = mockMailgunClient;
    service['initPromise'] = Promise.resolve();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should send an email successfully', async () => {
      const emailOptions: EmailOptions = {
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test message',
      };

      const mockResponse: MessagesSendResult = {
        id: 'test-id',
        message: 'Queued. Thank you.',
      };

      mockMailgunClient.messages.create.mockResolvedValue(mockResponse);

      const result = await service.sendEmail(emailOptions);

      expect(mockMailgunClient.messages.create).toHaveBeenCalledWith(
        'test-domain.com',
        expect.objectContaining({
          from: 'test@test-domain.com',
          to: 'recipient@example.com',
          subject: 'Test Subject',
          text: 'Test message',
        }),
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('sendSimpleEmail', () => {
    it('should send a simple email', async () => {
      const mockResponse: MessagesSendResult = {
        id: 'test-id',
        message: 'Queued. Thank you.',
      };

      mockMailgunClient.messages.create.mockResolvedValue(mockResponse);

      const result = await service.sendSimpleEmail(
        'recipient@example.com',
        'Test Subject',
        'Test message',
      );

      expect(mockMailgunClient.messages.create).toHaveBeenCalledWith(
        'test-domain.com',
        expect.objectContaining({
          to: 'recipient@example.com',
          subject: 'Test Subject',
          text: 'Test message',
        }),
      );
      expect(result).toEqual(mockResponse);
    });
  });
});

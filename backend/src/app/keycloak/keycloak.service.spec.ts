import { Test, TestingModule } from '@nestjs/testing';
import { KeycloakService } from './keycloak.service';

describe('KeycloakService', () => {
  let service: KeycloakService;

  const mockKcAdminClient = {
    auth: jest.fn(),
    setConfig: jest.fn(),
    users: {
      find: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeycloakService],
    }).compile();

    service = module.get<KeycloakService>(KeycloakService);
    // Inject mock client
    service['kcAdminClient'] = mockKcAdminClient;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return list of users', async () => {
      const users = [
        { id: '1', username: 'user1', email: 'user1@example.com' },
        { id: '2', username: 'user2', email: 'user2@example.com' },
      ];

      mockKcAdminClient.users.find.mockResolvedValue(users);
      mockKcAdminClient.auth.mockResolvedValue(undefined);
      mockKcAdminClient.setConfig.mockReturnValue(undefined);

      const result = await service.getUsers();

      expect(mockKcAdminClient.auth).toHaveBeenCalled();
      expect(mockKcAdminClient.users.find).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });
});

import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AccountsGateway } from '../abstract/accounts.gateway';
import { AccountsGatewayImpl } from './accounts.gateway';

describe('AccountsGateway Tests', () => {
  let accountsGateway: AccountsGateway;
  let httpService: HttpService;

  beforeAll(async () => {
    httpService = new HttpService();
    accountsGateway = new AccountsGatewayImpl(httpService);
  });

  beforeEach(async () => {
    jest.resetAllMocks();
  });

  describe('when performing a account create', () => {
    it('should return a transaction code', async () => {
      const mockResponse = {
        number: 123456789,
      };
      const httpSpy = jest.spyOn(httpService, 'post').mockReturnValueOnce(
        of({
          data: mockResponse,
          headers: {} as any,
          config: {} as any,
          status: 200,
          statusText: 'OK',
        }),
      );
      const result = await accountsGateway.createAccount('12345678909');
      expect(httpSpy).toHaveBeenNthCalledWith(
        1,
        `http://localhost:undefined/api/v1/accounts`,
        {
          bearerDocument: '12345678909',
        },
      );
      expect(result).toEqual({
        number: mockResponse.number,
      });
    });
  });
});

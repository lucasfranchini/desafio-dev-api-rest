import { createMock } from '@golevelup/ts-jest';
import { AccountRepository } from '@infra/db/repositories/accounts/abstractions/account.repository';
import { AccountsNotFound } from 'src/commons/errors/custom-exceptions/accounts-not-found';
import { accountStub } from 'test/stub/account.stub';
import { FindAccountByNumberService } from './find-account-by-number.usecase';

describe('FindAccountByNumber', () => {
  let mockRepository: jest.Mocked<AccountRepository>;
  let findAccountByNumberService: FindAccountByNumberService;

  beforeEach(() => {
    mockRepository = createMock<AccountRepository>();
    findAccountByNumberService = new FindAccountByNumberService(mockRepository);
  });

  describe('Given a valid Number accountNumber', () => {
    describe('When executing use case', () => {
      it('Should return an account', async () => {
        mockRepository.findByAccountNumber.mockResolvedValue(accountStub);
        const result = await findAccountByNumberService.execute(
          accountStub.number,
        );
        expect(result).toEqual(accountStub);
      });

      it('Should call repository with correct params', async () => {
        mockRepository.findByAccountNumber.mockResolvedValue(accountStub);
        await findAccountByNumberService.execute(accountStub.number);
        expect(mockRepository.findByAccountNumber).toHaveBeenCalledWith(
          accountStub.number,
        );
      });
    });
  });

  describe('Given an invalid Number accountNumber', () => {
    describe('When executing use case', () => {
      it('Should return account not found error', async () => {
        expect.assertions(1);

        mockRepository.findByAccountNumber.mockResolvedValue(null);

        try {
          await findAccountByNumberService.execute(accountStub.number);
        } catch (error) {
          expect(error).toBeInstanceOf(AccountsNotFound);
        }
      });
    });
  });
});

import { AccountStatus } from '@domain/accounts/enums/accountStatus';
import { createMock } from '@golevelup/ts-jest';
import { AccountRepository } from '@infra/db/repositories/accounts/abstractions/account.repository';
import { ErrorsMessage } from 'src/commons/errors/enums';
import { accountStub } from 'test/stub/account.stub';
import { UpdateAccountStatusService } from './update-account-status';
describe('UpdateAccountUsecase', () => {
  let updateAccountStatusService: UpdateAccountStatusService;
  let mockRepository: AccountRepository;

  beforeEach(() => {
    mockRepository = createMock<AccountRepository>();
    updateAccountStatusService = new UpdateAccountStatusService(mockRepository);
  });

  describe('Given an existing account', () => {
    describe('When executing use case', () => {
      it('Should throw an error for database error', async () => {
        jest
          .spyOn(mockRepository, 'updateStatus')
          .mockImplementationOnce(() => {
            throw new Error('Database error');
          });

        await expect(
          updateAccountStatusService.execute(
            accountStub.number,
            AccountStatus.INACTIVE,
          ),
        ).rejects.toThrow('Database error');
      });

      it('Should return updated account id', async () => {
        const { number } = accountStub;
        jest
          .spyOn(mockRepository, 'updateStatus')
          .mockResolvedValueOnce(accountStub);

        const res = await updateAccountStatusService.execute(
          number,
          AccountStatus.INACTIVE,
        );

        expect(res).toEqual(accountStub);
      });
    });
  });

  describe('Given an inexisting account', () => {
    describe('When executing use case', () => {
      it('Should throw an error for account not found', async () => {
        jest
          .spyOn(mockRepository, 'updateStatus')
          .mockImplementationOnce(() => null);

        await expect(
          updateAccountStatusService.execute(
            accountStub.number,
            AccountStatus.INACTIVE,
          ),
        ).rejects.toThrow(ErrorsMessage.ACCOUNTS_NOT_FOUND);
      });
    });
  });
});

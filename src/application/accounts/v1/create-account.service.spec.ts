import { createMock } from '@golevelup/ts-jest';
import { AccountRepository } from '@infra/db/repositories/abstractions/account.repository';
import {
  accountStub,
  inputCreateAccountStub,
  invalidAccountStub,
} from '@test/stub/account.stub';
import { CreateAccountService } from './create-account.service';

describe('CreateAccountUsecase', () => {
  let createAccountUseCase: CreateAccountService;
  let mockRepository: AccountRepository;

  beforeEach(() => {
    mockRepository = createMock<AccountRepository>();
    createAccountUseCase = new CreateAccountService(mockRepository);
  });

  describe('Given an valid account', () => {
    describe('When executing use case', () => {
      it('Should return with id and timestamps', async () => {
        jest
          .spyOn(mockRepository, 'create')
          .mockImplementationOnce(() =>
            Promise.resolve({ accountId: accountStub.accountId }),
          );

        const output = await createAccountUseCase.execute(
          inputCreateAccountStub,
        );

        expect(output).toEqual({ accountId: accountStub.accountId });
      });
    });
  });

  describe('Given an invalid account', () => {
    describe('When executing use case', () => {
      it('Should throw an error for database error', async () => {
        jest.spyOn(mockRepository, 'create').mockImplementationOnce(() => {
          throw new Error('Database error');
        });

        await expect(
          createAccountUseCase.execute(invalidAccountStub),
        ).rejects.toThrow('Não foi possivel salvar a conta no banco de dados');
      });
    });
  });
});

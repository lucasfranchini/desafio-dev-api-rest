import { MovementType } from '@domain/accounts/enums/movement-type.enum';
import { createMock } from '@golevelup/ts-jest';
import { AccountRepository } from '@infra/db/repositories/accounts/abstractions/account.repository';
import { CheckBankStatementGateway } from '@infra/gateways/abstractions/check-bank-statement.gateway';
import { EventPublisher } from '@infra/queues/abstractions/event-publisher';
import { AccountBalanceInvalid } from 'src/commons/errors/custom-exceptions/account-balance-invalid';
import { AccountBalanceMovementForbidden } from 'src/commons/errors/custom-exceptions/account-balance-movement-Forbidden';
import { AccountBalanceMovementForbiddenForValue } from 'src/commons/errors/custom-exceptions/account-balance-movement-Forbidden-for-value';
import { AccountsNotFound } from 'src/commons/errors/custom-exceptions/accounts-not-found';
import { accountStub } from 'test/stub/account.stub';
import { AccountBalanceMovementService } from './account-balance-movement.service';

describe('FindAccountByNumber', () => {
  let mockRepository: jest.Mocked<AccountRepository>;
  let mockCheckBankStatementGateway: jest.Mocked<CheckBankStatementGateway>;
  let mockRmqEventPublisher: EventPublisher;
  let accountBalanceMovementUseCase: AccountBalanceMovementService;

  beforeEach(() => {
    mockRepository = createMock<AccountRepository>();
    mockRmqEventPublisher = createMock<EventPublisher>();
    mockCheckBankStatementGateway = createMock<CheckBankStatementGateway>();
    accountBalanceMovementUseCase = new AccountBalanceMovementService(
      mockRepository,
      mockRmqEventPublisher,
      mockCheckBankStatementGateway,
    );
    mockRepository.updateBalance = jest.fn(async (_acc, balance) => ({
      balance,
    }));
    mockCheckBankStatementGateway.checkBankStatement.mockResolvedValueOnce([]);
  });

  describe('Given a valid accountNumber', () => {
    describe('And a valid amount', () => {
      describe.each([MovementType.IN, MovementType.OUT])(
        'And a %s movement type',
        (type) => {
          describe('When executing use case', () => {
            it('Should return updated balance', async () => {
              mockRepository.findByAccountNumber.mockResolvedValue({
                ...accountStub,
                balance: 1000,
              });

              const result = await accountBalanceMovementUseCase.execute({
                type,
                amount: 100,
                accountNumber: accountStub.number,
              });
              expect(result).toEqual({
                updatedBalance: type === MovementType.IN ? 1100 : 900,
              });
            });

            it('Should call publisher with correct params', async () => {
              mockRepository.findByAccountNumber.mockResolvedValue({
                ...accountStub,
                balance: 1000,
              });
              await accountBalanceMovementUseCase.execute({
                type,
                amount: 100,
                accountNumber: accountStub.number,
              });
              expect(mockRmqEventPublisher.publish).toHaveBeenCalledWith(
                undefined,
                undefined,
                {
                  type,
                  amount: 100,
                  accountNumber: accountStub.number,
                },
              );
            });
          });
        },
      );
    });

    describe('And an invalid amount', () => {
      describe('When executing use case', () => {
        it('Should throw AccountBalanceInvalid error', async () => {
          expect.assertions(1);

          mockRepository.findByAccountNumber.mockResolvedValue(accountStub);

          try {
            await accountBalanceMovementUseCase.execute({
              type: MovementType.OUT,
              amount: 1100,
              accountNumber: accountStub.number,
            });
          } catch (error) {
            expect(error).toBeInstanceOf(AccountBalanceInvalid);
          }
        });
      });
    });

    describe('And a withdrawal limit exceeded', () => {
      describe('When executing use case', () => {
        it.only('Should throw AccountBalanceInvalid error', async () => {
          expect.assertions(1);

          mockRepository.findByAccountNumber.mockResolvedValue({
            ...accountStub,
            balance: 10000,
          });

          try {
            await accountBalanceMovementUseCase.execute({
              type: MovementType.OUT,
              amount: 3000,
              accountNumber: accountStub.number,
            });
          } catch (error) {
            expect(error).toBeInstanceOf(
              AccountBalanceMovementForbiddenForValue,
            );
          }
        });
      });
    });
  });

  describe('Given an non existing accountNumber', () => {
    describe('When executing use case', () => {
      it('Should return account not found error', async () => {
        expect.assertions(1);

        mockRepository.findByAccountNumber.mockResolvedValue(null);

        try {
          await accountBalanceMovementUseCase.execute({
            type: MovementType.IN,
            amount: 100,
            accountNumber: accountStub.number,
          });
        } catch (error) {
          expect(error).toBeInstanceOf(AccountsNotFound);
        }
      });
    });
  });

  describe('Given an invalid accountNumber', () => {
    describe('When executing use case', () => {
      it('Should return account not found error', async () => {
        expect.assertions(1);

        mockRepository.findByAccountNumber.mockResolvedValue({
          ...accountStub,
          status: 'INACTIVE',
        });

        try {
          await accountBalanceMovementUseCase.execute({
            type: MovementType.IN,
            amount: 100,
            accountNumber: accountStub.number,
          });
        } catch (error) {
          expect(error).toBeInstanceOf(AccountBalanceMovementForbidden);
        }
      });
    });
  });
});

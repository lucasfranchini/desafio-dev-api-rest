import { createMock } from '@golevelup/ts-jest';
import { BankStatementRepository } from '@infra/db/repositories/bank-statement/abstractions/bank-statement.repository';
import { ErrorsMessage } from 'src/commons/errors/enums';
import { SaveMovementService } from './save-movement.service';

describe('CreateBearerService', () => {
  let saveMovementService: SaveMovementService;
  let mockBankStatementRepository: BankStatementRepository;

  beforeEach(() => {
    mockBankStatementRepository = createMock<BankStatementRepository>();
    saveMovementService = new SaveMovementService(mockBankStatementRepository);
  });

  describe('Given an valid bearer', () => {
    describe('When executing use case', () => {
      it('Should return with accountNumber and document', async () => {
        jest
          .spyOn(mockBankStatementRepository, 'create')
          .mockImplementationOnce(() =>
            Promise.resolve({
              id: 1,
            }),
          );

        const output = await saveMovementService.execute({
          accountNumber: 1,
          amount: 100,
          type: 'IN',
        });

        expect(output).toEqual({
          id: 1,
        });
      });
    });
  });

  describe('Given an invalid bearer', () => {
    describe('When executing use case', () => {
      it('Should throw an error for database error', async () => {
        jest
          .spyOn(mockBankStatementRepository, 'create')
          .mockImplementationOnce(() => {
            throw new Error('Database error');
          });

        await expect(
          saveMovementService.execute({
            document: 'invalido',
            name: 1233,
          } as any),
        ).rejects.toThrow(ErrorsMessage.BANK_STATEMENT_NOT_CREATED);
      });
    });
  });
});

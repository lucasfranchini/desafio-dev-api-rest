import { createMock } from '@golevelup/ts-jest';
import { BankStatementRepository } from '@infra/db/repositories/bank-statement/abstractions/bank-statement.repository';
import { ErrorsMessage } from 'src/commons/errors/enums';
import { GetBankStatementService } from './get-bank-statement.service';

describe('CreateBearerService', () => {
  let getBankStatementService: GetBankStatementService;
  let mockBankStatementRepository: BankStatementRepository;
  const date = new Date();

  beforeEach(() => {
    mockBankStatementRepository = createMock<BankStatementRepository>();
    getBankStatementService = new GetBankStatementService(
      mockBankStatementRepository,
    );
  });

  describe('Given an valid bearer', () => {
    describe('When executing use case', () => {
      it('Should return with accountNumber and document', async () => {
        jest
          .spyOn(mockBankStatementRepository, 'getBankStatementByDate')
          .mockImplementationOnce(async () => [
            {
              id: 1,
              accountNumber: 123456,
              amount: 1000,
              type: 'IN',
              timestamp: date,
            },
          ]);

        const output = await getBankStatementService.execute(date, date, 1);

        expect(output).toEqual([
          {
            id: 1,
            accountNumber: 123456,
            amount: 1000,
            type: 'IN',
            timestamp: date,
          },
        ]);
      });
    });
  });

  describe('Given an invalid bearer', () => {
    describe('When executing use case', () => {
      it('Should throw an error for database error', async () => {
        jest
          .spyOn(mockBankStatementRepository, 'getBankStatementByDate')
          .mockImplementationOnce(() => {
            throw new Error('Database error');
          });

        await expect(
          getBankStatementService.execute(date, 'invalid-date' as any, 1),
        ).rejects.toThrow(ErrorsMessage.BANK_STATEMENT_NOT_FOUND);
      });
    });
  });
});

import { createMock } from '@golevelup/ts-jest';
import { BearerRepository } from '@infra/db/repositories/bearers/abstractions/bearers.repository';
import { accountStub } from 'test/stub/account.stub';
import { DeleteBearerService } from './delete-bearer.service';

describe('CreateBearerService', () => {
  let deleteBearerUseCase: DeleteBearerService;
  let mockBearerRepository: BearerRepository;

  beforeEach(() => {
    mockBearerRepository = createMock<BearerRepository>();
    deleteBearerUseCase = new DeleteBearerService(mockBearerRepository);
  });

  describe('Given an valid bearer', () => {
    describe('When executing use case', () => {
      it('Should return with accountNumber and document', async () => {
        const output = await deleteBearerUseCase.execute(
          accountStub.bearerDocument,
        );

        expect(output).toEqual(undefined);
      });
    });
  });

  describe('Given an invalid bearer', () => {
    describe('When executing use case', () => {
      it('Should throw an error for database error', async () => {
        jest
          .spyOn(mockBearerRepository, 'deleteByDocument')
          .mockImplementationOnce(() => {
            throw new Error('Database error');
          });

        await expect(deleteBearerUseCase.execute('invalido')).rejects.toThrow(
          'Não foi possivel salvar o portador no banco de dados',
        );
      });
    });
  });
});

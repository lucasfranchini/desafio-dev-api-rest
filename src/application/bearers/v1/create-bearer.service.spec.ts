import { createMock } from '@golevelup/ts-jest';
import { BearerRepository } from '@infra/db/repositories/bearers/abstractions/bearers.repository';
import { accountStub } from 'test/stub/account.stub';
import { CreateBearerService } from './create-bearer.service';

describe('CreateBearerService', () => {
  let createBearerUseCase: CreateBearerService;
  let mockBearerRepository: BearerRepository;

  beforeEach(() => {
    mockBearerRepository = createMock<BearerRepository>();
    createBearerUseCase = new CreateBearerService(mockBearerRepository);
  });

  describe('Given an valid bearer', () => {
    describe('When executing use case', () => {
      it('Should return with accountNumber and document', async () => {
        jest.spyOn(mockBearerRepository, 'create').mockImplementationOnce(() =>
          Promise.resolve({
            document: accountStub.bearerDocument,
            accountNumber: 1,
          }),
        );

        const output = await createBearerUseCase.execute({
          document: accountStub.bearerDocument,
          name: 'teste',
        });

        expect(output).toEqual({
          accountNumber: 1,
          document: accountStub.bearerDocument,
        });
      });
    });
  });

  describe('Given an invalid bearer', () => {
    describe('When executing use case', () => {
      it('Should throw an error for database error', async () => {
        jest
          .spyOn(mockBearerRepository, 'create')
          .mockImplementationOnce(() => {
            throw new Error('Database error');
          });

        await expect(
          createBearerUseCase.execute({
            document: 'invalido',
            name: 1233,
          } as any),
        ).rejects.toThrow(
          'Não foi possivel salvar o portador no banco de dados',
        );
      });
    });
  });
});

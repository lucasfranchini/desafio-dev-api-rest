import { createMock } from '@golevelup/ts-jest';
import { BearerRepository } from '@infra/db/repositories/bearers/abstractions/bearers.repository';
import { AccountsGateway } from '@infra/gateways/accounts/abstract/accounts.gateway';
import { accountStub } from 'test/stub/account.stub';
import { CreateBearerService } from './create-bearer.service';

describe('CreateBearerService', () => {
  let createBearerUseCase: CreateBearerService;
  let mockRepository: BearerRepository;
  let mockGateway: AccountsGateway;

  beforeEach(() => {
    mockRepository = createMock<BearerRepository>();
    mockGateway = createMock<AccountsGateway>();
    createBearerUseCase = new CreateBearerService(mockRepository, mockGateway);
    mockGateway.createAccount = jest.fn(async () => ({
      number: 1,
    }));
  });

  describe('Given an valid bearer', () => {
    describe('When executing use case', () => {
      it('Should return with accountNumber and document', async () => {
        jest
          .spyOn(mockRepository, 'create')
          .mockImplementationOnce(() =>
            Promise.resolve({ document: accountStub.bearerDocument }),
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
        jest.spyOn(mockRepository, 'create').mockImplementationOnce(() => {
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

  describe('Given an gateway error', () => {
    describe('When executing use case', () => {
      it('Should throw an error for alarm for create manually account', async () => {
        jest.spyOn(mockGateway, 'createAccount').mockImplementationOnce(() => {
          throw new Error('Database error');
        });

        await expect(
          createBearerUseCase.execute({
            document: 'invalido',
            name: '1233',
          }),
        ).rejects.toThrow(
          'Portador criado com sucesso, mas não foi possível criar a conta bancária, por favor crie manualmente a conta com o número do portador.',
        );
      });
    });
  });
});

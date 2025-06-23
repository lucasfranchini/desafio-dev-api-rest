import { AccountStatus } from '@domain/accounts/enums/accountStatus';
import { Database } from '@infra/db/schemas';
import { Account } from '@infra/db/schemas/account.schema';
import { INestApplication } from '@nestjs/common';
import { ErrorsSource } from 'src/commons/errors/enums';
import * as request from 'supertest';
import { clearDb } from 'test/utils/clearDB';
import { setupTestSuite } from 'test/utils/setupTest';

const setupAccount = async (dataSource: Database) => {
  const { document } = await dataSource
    .insertInto('bearer')
    .values({
      document: '12345678909', // Example document
      name: 'Test User',
    })
    .returning('document')
    .executeTakeFirstOrThrow();
  const account = await dataSource
    .insertInto('account')
    .values({
      balance: 0,
      bearerDocument: document,
      branch: '0001',
      status: AccountStatus.ACTIVE,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
  return account;
};

describe('AccountsController', () => {
  let app: INestApplication;
  let dataSource: Database;
  let account: Account;

  beforeAll(async () => {
    const { appSetup, dataSourceSetup } = await setupTestSuite();
    app = appSetup;
    dataSource = dataSourceSetup;
    account = await setupAccount(dataSource);
  });

  afterAll(async () => {
    await clearDb(dataSource);
    await app.close();
  });

  describe('GET /v1/accounts/:accountNumber', () => {
    describe('Given an existing accountNumber', () => {
      describe(`When executing GET /v1/accounts/:accountNumber`, () => {
        it('Should return 200 with account attributes', async () => {
          const { body, status } = await request(app.getHttpServer()).get(
            `/api/v1/accounts/${account.number}`,
          );

          expect(status).toBe(200);
          expect(body).toEqual({
            ...account,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          });
        });
      });
    });

    describe('Given an non-existing accountNumber', () => {
      describe(`When executing GET /v1/accounts/:accountNumber`, () => {
        it('Should return 404 with account not found message', async () => {
          const accountNumber = 111111111111111; // Non-existing account number
          const { body, status } = await request(app.getHttpServer()).get(
            `/api/v1/accounts/${accountNumber}`,
          );

          expect(status).toBe(404);
          expect(body).toEqual({
            message: 'Não foi encontrado contas no banco de dados',
            source: 'find account by number',
          });
        });
      });
    });

    describe('Given an infrastruture issue', () => {
      describe(`When executing GET /v1/accounts/:accountNumber`, () => {
        it('Should return 500 with internal server error message', async () => {
          jest.spyOn(dataSource, 'selectFrom').mockImplementationOnce(() => {
            throw new Error('Database connection error');
          });
          const { body, status } = await request(app.getHttpServer()).get(
            `/api/v1/accounts/${account.number}`,
          );

          expect(status).toBe(500);
          expect(body).toEqual({
            message: 'Database connection error',
            source: 'find account by number',
          });
        });
      });
    });
  });

  describe('PUT /v1/accounts/:accountNumber/:status', () => {
    describe('Given an existing accountNumber', () => {
      describe('And a valid status', () => {
        describe.each([
          { status: AccountStatus.ACTIVE },
          { status: AccountStatus.INACTIVE },
          { status: AccountStatus.BLOCKED },
        ])(
          `When executing PUT /v1/accounts/:accountNumber/:status`,
          ({ status }) => {
            it('Should return 200 with account attributes', async () => {
              const res = await request(app.getHttpServer()).put(
                `/api/v1/accounts/${account.number}/${status}`,
              );

              expect(res.body).toEqual({
                ...account,
                status,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
              });
            });
          },
        );
      });
    });

    describe('Given an non-existing accountNumber', () => {
      describe(`When executing PUT /v1/accounts/:accountNumber/:status`, () => {
        it('Should return 404 with account not found message', async () => {
          const accountNumber = 0; // Non-existing account number
          const { body, status } = await request(app.getHttpServer()).put(
            `/api/v1/accounts/${accountNumber}/ACTIVE`,
          );

          expect(status).toBe(404);
          expect(body).toEqual({
            message: 'Não foi encontrado contas no banco de dados',
            source: ErrorsSource.UPDATE_STATUS_ACCOUNT,
          });
        });
      });
    });

    describe('Given an invalid status', () => {
      describe(`When executing put /v1/accounts/:accountNumber/:status`, () => {
        it('Should return 400 with invalid status message', async () => {
          const accountNumber = 0; // Non-existing account number
          const { body, status } = await request(app.getHttpServer()).put(
            `/api/v1/accounts/${accountNumber}/ERRADO`,
          );

          expect(status).toBe(400);
          expect(body).toEqual({
            message: 'Status inválido',
            source: ErrorsSource.UPDATE_STATUS_ACCOUNT,
          });
        });
      });
    });

    describe('Given an infrastruture issue', () => {
      describe(`When executing put /v1/accounts/:accountNumber/:status`, () => {
        it('Should return 500 with internal server error message', async () => {
          jest.spyOn(dataSource, 'updateTable').mockImplementationOnce(() => {
            throw new Error('Database connection error');
          });
          const { body, status } = await request(app.getHttpServer()).put(
            `/api/v1/accounts/${account.number}/ACTIVE`,
          );

          expect(status).toBe(500);
          expect(body).toEqual({
            message: 'Database connection error',
            source: ErrorsSource.UPDATE_STATUS_ACCOUNT,
          });
        });
      });
    });
  });
});

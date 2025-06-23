import { faker } from '@faker-js/faker';

export const accountStub = {
  branch: '0001',
  balance: 0,
  status: 'ACTIVE',
  createdAt: new Date(),
  updatedAt: new Date(),
  number: Number(faker.finance.accountNumber(11)),
  bearerDocument: faker.number
    .int({ min: 10000000000, max: 99999999999 })
    .toString(),
};

export const invalidAccountStub: any = {
  bearerDocument: 'invalido',
};

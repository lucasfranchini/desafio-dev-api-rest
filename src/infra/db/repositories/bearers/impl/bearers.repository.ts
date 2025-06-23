import { Database } from '@infra/db/schemas';
import { NewBearer } from '@infra/db/schemas/bearer.schema';
import { Injectable } from '@nestjs/common';
import { BearerRepository } from '../abstractions/bearers.repository';

@Injectable()
export class BearersRepositoryImpl implements BearerRepository {
  constructor(private readonly dataSource: Database) {}

  async create(bearerData: NewBearer) {
    const { account, ...bearer } = bearerData;
    return await this.dataSource.transaction().execute(async (tx) => {
      const { document } = await tx
        .insertInto('bearer')
        .values(bearer)
        .returning('document')
        .executeTakeFirstOrThrow();
      const { number } = await tx
        .insertInto('account')
        .values(account)
        .returning('number')
        .executeTakeFirstOrThrow();
      return {
        document,
        accountNumber: number,
      };
    });
  }

  async deleteByDocument(document: string) {
    await this.dataSource
      .deleteFrom('bearer')
      .where('document', '=', document)
      .executeTakeFirstOrThrow();
  }
}

import { Database } from '@infra/db/schemas';
import { NewBearer } from '@infra/db/schemas/bearer.schema';
import { Injectable } from '@nestjs/common';
import { BearerRepository } from '../abstractions/bearers.repository';

@Injectable()
export class BearersRepositoryImpl implements BearerRepository {
  constructor(private readonly dataSource: Database) {}

  async create(bearerData: NewBearer) {
    const res = await this.dataSource
      .insertInto('bearer')
      .values(bearerData)
      .returning('document')
      .executeTakeFirst();

    return res;
  }
}

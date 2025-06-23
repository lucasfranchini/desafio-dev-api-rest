import { Database } from '@infra/db/schemas';
import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../abstractions/account.repository';

@Injectable()
export class AccountRepositoryImpl implements AccountRepository {
  constructor(private readonly dataSource: Database) {}
}

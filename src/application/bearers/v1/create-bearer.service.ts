import { AccountStatus } from '@domain/accounts/enums/accountStatus';
import { CreateBearerDTO } from '@domain/bearers/dtos/create-bearer.dto';
import { BearerRepository } from '@infra/db/repositories/bearers/abstractions/bearers.repository';
import { Injectable } from '@nestjs/common';
import { BearerNotCreated } from 'src/commons/errors/custom-exceptions/Bearer-not-created';
import { ErrorsSource } from 'src/commons/errors/enums';

@Injectable()
export class CreateBearerService {
  constructor(private readonly bearerRepository: BearerRepository) {}

  async execute(bearer: CreateBearerDTO) {
    try {
      const newAccount = {
        balance: 0,
        status: AccountStatus.ACTIVE,
        branch: '0001', // Default branch, can be customized
        bearerDocument: bearer.document,
      };

      return await this.bearerRepository.create({
        ...bearer,
        account: newAccount,
      });
    } catch (error: any) {
      throw new BearerNotCreated(ErrorsSource.CREATE_BEARER);
    }
  }
}

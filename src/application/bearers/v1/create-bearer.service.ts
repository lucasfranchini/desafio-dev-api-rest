import { CreateBearerDTO } from '@domain/bearers/dtos/create-bearer.dto';
import { BearerRepository } from '@infra/db/repositories/bearers/abstractions/bearers.repository';
import { AccountsGateway } from '@infra/gateways/accounts/abstract/accounts.gateway';
import { Injectable } from '@nestjs/common';
import { UnexpectedError } from 'src/commons/errors/custom-exceptions';
import { BearerNotCreated } from 'src/commons/errors/custom-exceptions/Bearer-not-created';
import { ErrorsSource } from 'src/commons/errors/enums';

@Injectable()
export class CreateBearerService {
  constructor(
    private readonly bearerRepository: BearerRepository,
    private readonly accountsGateway: AccountsGateway,
  ) {}

  async execute(bearer: CreateBearerDTO) {
    try {
      await this.bearerRepository.create(bearer);
    } catch (error: any) {
      throw new BearerNotCreated(ErrorsSource.CREATE_BEARER);
    }

    try {
      const account = await this.accountsGateway.createAccount(bearer.document);
      return {
        document: bearer.document,
        accountNumber: account.number,
      };
    } catch (error: any) {
      console.log(error);
      throw new UnexpectedError(
        ErrorsSource.CREATE_BEARER,
        'Portador criado com sucesso, mas não foi possível criar a conta bancária, por favor crie manualmente a conta com o número do portador.',
      );
    }
  }
}

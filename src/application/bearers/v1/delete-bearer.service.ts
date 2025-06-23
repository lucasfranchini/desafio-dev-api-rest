import { BearerRepository } from '@infra/db/repositories/bearers/abstractions/bearers.repository';
import { Injectable } from '@nestjs/common';
import { BearerNotDeleted } from 'src/commons/errors/custom-exceptions/Bearer-not-deleted';
import { ErrorsSource } from 'src/commons/errors/enums';

@Injectable()
export class DeleteBearerService {
  constructor(private readonly bearerRepository: BearerRepository) {}

  async execute(document: string) {
    try {
      await this.bearerRepository.deleteByDocument(document);
    } catch (error: any) {
      throw new BearerNotDeleted(ErrorsSource.DELETE_BEARER);
    }
  }
}

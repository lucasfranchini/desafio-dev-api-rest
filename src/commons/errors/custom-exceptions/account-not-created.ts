import { InternalServerErrorException } from '@nestjs/common';
import { ErrorsMessage, ErrorsSource } from '../enums';

export class AccountNotCreated extends InternalServerErrorException {
  constructor(source: ErrorsSource, databaseError?: Error, payload?: any) {
    super({
      message: ErrorsMessage.ACCOUNT_NOT_CREATED,
      source,
      databaseError,
      payload,
    });
  }
}

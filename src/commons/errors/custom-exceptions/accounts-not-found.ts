import { NotFoundException } from '@nestjs/common';
import { ErrorsMessage, ErrorsSource } from '../enums';

export class AccountsNotFound extends NotFoundException {
  constructor(source: ErrorsSource, databaseError?: Error) {
    super({
      message: ErrorsMessage.ACCOUNTS_NOT_FOUND,
      source,
      databaseError,
    });
  }
}

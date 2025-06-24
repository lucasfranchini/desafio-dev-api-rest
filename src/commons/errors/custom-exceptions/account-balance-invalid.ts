import { BadRequestException } from '@nestjs/common';
import { ErrorsMessage, ErrorsSource } from '../enums';

export class AccountBalanceInvalid extends BadRequestException {
  constructor(source: ErrorsSource) {
    super({
      message: ErrorsMessage.ACCOUNT_BALANCE_INVALID,
      source,
    });
  }
}

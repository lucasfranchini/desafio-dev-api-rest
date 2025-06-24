import { ForbiddenException } from '@nestjs/common';
import { ErrorsMessage, ErrorsSource } from '../enums';

export class AccountBalanceMovementForbidden extends ForbiddenException {
  constructor(source: ErrorsSource) {
    super({
      message: ErrorsMessage.ACCOUNT_BALANCE_MOVEMENT_FORBIDDEN,
      source,
    });
  }
}

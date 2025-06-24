import { ForbiddenException } from '@nestjs/common';
import { ErrorsMessage, ErrorsSource } from '../enums';

export class AccountBalanceMovementForbiddenForValue extends ForbiddenException {
  constructor(source: ErrorsSource) {
    super({
      message: ErrorsMessage.ACCOUNT_BALANCE_MOVEMENT_FORBIDDEN_FOR_VALUE,
      source,
    });
  }
}

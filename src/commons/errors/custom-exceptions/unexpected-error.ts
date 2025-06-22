import { InternalServerErrorException } from '@nestjs/common';
import { ErrorsSource } from '../enums';
import { ErrorsMessage } from '../enums/errors-message.enum';

export class UnexpectedError extends InternalServerErrorException {
  constructor(source: ErrorsSource, message?: string) {
    super({
      message: message || ErrorsMessage.DEFAULT,
      source,
    });
  }
}

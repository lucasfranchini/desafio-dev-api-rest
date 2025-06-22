import { HttpException } from '@nestjs/common';
import { UnexpectedError } from '../custom-exceptions';
import { ErrorsSource } from '../enums';

export function handleError(source: ErrorsSource, error: any): void {
  if (error instanceof HttpException) {
    throw error;
  }

  throw new UnexpectedError(source, error.message);
}

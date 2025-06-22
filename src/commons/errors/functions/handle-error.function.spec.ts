import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { UnexpectedError } from '../custom-exceptions';
import { ErrorsMessage, ErrorsSource } from '../enums';
import { handleError } from './handle-error.function';

describe('handleError() unit tests', () => {
  describe('given the error is an instance of http exception', () => {
    describe('when executing the function', () => {
      it('should throw the same error', () => {
        const httpException = new BadRequestException('test');

        try {
          handleError(ErrorsSource.CREATE_ACCOUNT, httpException);
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException);
          expect(error).toBe(httpException);
          expect(error.status).toBe(HttpStatus.BAD_REQUEST);
        }
      });
    });
  });

  describe('given the error is not an instance of http exception with message', () => {
    describe('when executing the function', () => {
      it('should throw UnexpectedError exception with the given message', () => {
        const error = new Error('test');

        try {
          handleError(ErrorsSource.CREATE_ACCOUNT, error);
        } catch (error) {
          expect(error).toBeInstanceOf(UnexpectedError);
          expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
          expect(error.message).toBe(error.message);
        }
      });
    });
  });

  describe('given the error is not an instance of http exception without message', () => {
    describe('when executing the function', () => {
      it('should throw UnexpectedError exception with default message', () => {
        const error = new Error();

        try {
          handleError(ErrorsSource.CREATE_ACCOUNT, error);
        } catch (error) {
          expect(error).toBeInstanceOf(UnexpectedError);
          expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
          expect(error.message).toBe(ErrorsMessage.DEFAULT);
        }
      });
    });
  });
});

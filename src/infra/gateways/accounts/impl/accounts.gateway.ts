import { HttpService } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { UnexpectedError } from 'src/commons/errors/custom-exceptions';
import { ErrorsSource } from 'src/commons/errors/enums';
import { AccountsGateway } from '../abstract/accounts.gateway';

@Injectable()
export class AccountsGatewayImpl implements AccountsGateway {
  constructor(private readonly httpService: HttpService) {}

  async createAccount(bearerDocument: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `http://localhost:${process.env.APP_PORT}/api/v1/accounts`,
          { bearerDocument },
        ),
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  handleError(error: any) {
    if (error instanceof AxiosError) {
      throw new HttpException(
        { source: ErrorsSource.ACCOUNTS_GATEWAY, data: error.response },
        error.response.status,
      );
    }
    throw new UnexpectedError(ErrorsSource.ACCOUNTS_GATEWAY, error.message);
  }
}

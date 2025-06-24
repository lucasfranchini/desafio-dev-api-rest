import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CheckBankStatementGateway } from '../abstractions/check-bank-statement.gateway';

@Injectable()
export class CheckBankStatementGatewayimpl
  implements CheckBankStatementGateway
{
  constructor(private readonly httpService: HttpService) {}

  async checkBankStatement(
    accountNumber: number,
    startDate: Date,
    endDate: Date,
  ) {
    const endpoint = `/api/v1/bank-statements?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&accountNumber=${accountNumber}`;
    const { data } = await this.handleGetRequest(endpoint);

    return data;
  }

  private async handleGetRequest(endpoint: string): Promise<any> {
    const url = `${process.env.API_URL}${endpoint}`;
    try {
      return await firstValueFrom(this.httpService.get(url));
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): void {
    throw new InternalServerErrorException(error);
  }
}

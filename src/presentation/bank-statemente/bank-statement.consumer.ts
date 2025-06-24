import { Injectable } from '@nestjs/common';

@Injectable()
export class BankStatementConsumer {
  async handleBankStatementMessage(message: any): Promise<void> {
    console.log('Received bank statement message:', message);
  }
}

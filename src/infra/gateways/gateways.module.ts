import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CheckBankStatementGateway } from './abstractions/check-bank-statement.gateway';
import { CheckBankStatementGatewayimpl } from './impl/check-balance.gateway';

const providers = [
  {
    provide: CheckBankStatementGateway,
    useClass: CheckBankStatementGatewayimpl,
  },
];

@Module({
  imports: [HttpModule],
  providers,
  exports: providers,
})
export class GatewaysModule {}

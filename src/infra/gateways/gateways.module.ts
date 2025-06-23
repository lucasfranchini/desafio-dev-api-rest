import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common/decorators/modules';
import { AccountsGateway } from './accounts/abstract/accounts.gateway';
import { AccountsGatewayImpl } from './accounts/impl/accounts.gateway';

const gateways = [
  {
    provide: AccountsGateway,
    useClass: AccountsGatewayImpl,
  },
];

@Module({
  imports: [HttpModule],
  exports: [AccountsGateway],
  providers: gateways,
})
export class GatewaysModule {}

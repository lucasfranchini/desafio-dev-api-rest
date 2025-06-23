import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from '@presentation/accounts/accounts.module';
import { BearersModule } from '@presentation/bearers/bearers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AccountsModule,
    BearersModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import 'dotenv/config';
import { ClsModule } from 'nestjs-cls';
import { EventPublisher } from './abstractions/event-publisher';
import { RMQEventPublisher } from './impl/rmq-event-publisher';

const providers = [{ provide: EventPublisher, useClass: RMQEventPublisher }];

@Module({
  imports: [ClsModule],
  providers,
  exports: providers,
})
export class RMQEventPublisherModule {}

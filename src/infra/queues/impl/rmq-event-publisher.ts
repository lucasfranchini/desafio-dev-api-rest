import { RabbitMQService } from '@bgaldino/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { EventPublisher } from '../abstractions/event-publisher';

@Injectable()
export class RMQEventPublisher implements EventPublisher {
  constructor(
    private readonly rabbitMqClient: RabbitMQService,
    private readonly clsService: ClsService,
  ) {}

  async publish(
    exchangeName: string,
    routingKey: string,
    payload: any,
    correlationId?: string,
  ): Promise<boolean> {
    return await this.rabbitMqClient.publish(exchangeName, routingKey, {
      correlationId: correlationId ?? this.clsService.getId(),
      ...payload,
    });
  }
}

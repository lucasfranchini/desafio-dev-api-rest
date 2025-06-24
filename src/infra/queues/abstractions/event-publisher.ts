export abstract class EventPublisher {
  abstract publish<P>(
    exchangeName: string,
    routingKey: string,
    payload: P,
    correlationId?: string,
  ): Promise<boolean>;
}

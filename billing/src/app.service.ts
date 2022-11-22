import { Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class AppService {
  handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
    console.log(
      `Billing user with stripe ID ${orderCreatedEvent.stripeId} for order with id: ${orderCreatedEvent.orderId}`,
    );
  }
}

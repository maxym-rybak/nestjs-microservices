export class OrderCreatedEvent {
  constructor(
    public readonly username: string,
    public readonly stripeId: string,
    public readonly orderId: string,
  ) {}
}

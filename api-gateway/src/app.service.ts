import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientKafka } from '@nestjs/microservices';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('BILLING_SERVICE') private readonly billingClient: ClientKafka,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  getUser(secret: string) {
    return this.authClient.send('get_user', { secret });
  }

  async signIn({ username, password }: SignInDto) {
    return this.authClient.send('sign_in', {
      username,
      password,
    });
  }

  createOrder({ secret, orderId }: CreateOrderDto) {
    return this.authClient
      .send('get_user', {
        secret,
      })
      .subscribe((res) => {
        if (res.status === 'error') {
          console.log(res);
          return;
        }

        this.billingClient.emit('order_created', {
          username: res.data.username,
          stripeId: res.data.stripeId,
          orderId,
        });
      });
  }
}

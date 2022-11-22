import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AppService {
  private readonly users: any[] = [
    {
      username: 'max',
      password: 'max password',
      stripeId: 12,
      secret: 'Hsd211ak231k',
    },
    {
      username: 'alex',
      password: 'alex password',
      stripeId: 13,
      secret: 'Idqw12kldasdn123l',
    },
  ];

  getUser(getUserRequest: { secret: string }) {
    const user = this.users.find(
      (user) => user.secret === getUserRequest.secret,
    );

    if (user) {
      return {
        value: {
          status: 'success',
          data: {
            username: user.username,
            stripeId: user.stripeId,
          },
          message: '',
          code: 201,
        },
      };
    } else {
      return {
        value: { status: 'error', message: 'Unauthorized', code: 401 },
      };
    }
  }

  signIn(signInDto: SignInDto) {
    const user = this.users.find(
      (user) => user.username === signInDto.username,
    );

    if (signInDto.password === user?.password) {
      return {
        value: {
          status: 'success',
          data: {
            secret: user.secret,
          },
          message: 'signed in',
          code: 201,
        },
      };
    } else if (!user) {
      return {
        value: { status: 'error', message: 'No such user', code: 400 },
      };
    } else {
      return {
        value: { status: 'error', message: 'Unauthorized', code: 401 },
      };
    }
  }
}

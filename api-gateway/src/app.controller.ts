import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ClientKafka } from '@nestjs/microservices';
import { TransformInterceptor } from './transform.interceptors';

@Controller()
@UseInterceptors(TransformInterceptor)
export class AppController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
    this.authClient.subscribeToResponseOf('sign_in');
  }

  onModuleDestroy(): any {
    this.authClient.close().then();
  }

  @Get('/user/:secret')
  getUser(@Param('secret') secret) {
    return this.appService.getUser(secret);
  }

  @Post('/create-order')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    this.appService.createOrder(createOrderDto);
  }

  @Post('/sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.appService.signIn(signInDto);
  }
}

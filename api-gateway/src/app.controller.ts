import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateOrderRequest } from './create-order-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createOrder(@Body() createOrdersRequest: CreateOrderRequest) {
    this.appService.createOrder(createOrdersRequest);
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Client, ClientKafka } from '@nestjs/microservices';
import { microserviceConfig } from './microservice-config';
import { CreatePostDto } from './app-dto/create-post.dto';

@Controller()
export class AppController {
  @Client(microserviceConfig)
  client: ClientKafka;

  onModuleInit() {
    const requestPatterns = ['findall-products', 'create-product'];
    requestPatterns.forEach((pattern) => {
      this.client.subscribeToResponseOf(pattern);
    });
  }

  @Get('post')
  getProduct(): Observable<string> {
    return this.client.send<string>('findall-posts', '');
  }

  @Post('post')
  createProduct(@Body() postDto: CreatePostDto): Observable<string> {
    return this.client.send<string>('create-post', JSON.stringify(postDto));
  }
}

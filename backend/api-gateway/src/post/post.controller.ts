import {
  Body,
  Controller,
  Delete,
  Get,
  OnModuleInit,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { microserviceConfig } from '../microservice-config';
import { Client, ClientKafka } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CONSTANTS } from 'common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('post')
@ApiBearerAuth()
@Controller('api/post')
export class PostController implements OnModuleInit {
  @Client(microserviceConfig)
  client: ClientKafka;

  onModuleInit() {
    const requestPatterns = [
      CONSTANTS.POST_TOPICS.CREATE_POST,
      CONSTANTS.POST_TOPICS.FIND_ALL_POSTS,
      CONSTANTS.POST_TOPICS.FIND_ONE_POST,
      CONSTANTS.POST_TOPICS.UPDATE_POST,
      CONSTANTS.POST_TOPICS.REMOVE_POST,
    ];
    requestPatterns.forEach((pattern) => {
      this.client.subscribeToResponseOf(pattern);
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  create(@Body() createPostDto: CreatePostDto) {
    return this.client.send<string>(
      CONSTANTS.POST_TOPICS.CREATE_POST,
      JSON.stringify(createPostDto),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.client.send<string>(CONSTANTS.POST_TOPICS.FIND_ALL_POSTS, '');
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id) {
    return this.client.send<string>(
      CONSTANTS.POST_TOPICS.FIND_ONE_POST,
      JSON.stringify({ id }),
    );
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.client.send<string>(
      CONSTANTS.POST_TOPICS.UPDATE_POST,
      JSON.stringify({ id, updatePostDto }),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id) {
    return this.client.send<string>(
      CONSTANTS.POST_TOPICS.REMOVE_POST,
      JSON.stringify({ id }),
    );
  }
}

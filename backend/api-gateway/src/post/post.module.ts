import { Module } from '@nestjs/common';
import { PostController } from './post.controller';

@Module({
  controllers: [PostController],
  providers: [],
})
export class PostModule {}

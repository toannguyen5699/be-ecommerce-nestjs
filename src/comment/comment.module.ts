import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Comment from './comment.entity';
import CommentsController from './comment.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCommentHandler } from './command/createComment.handler';
import { GetCommentsHandler } from './queries/getComments.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), CqrsModule],
  controllers: [CommentsController],
  providers: [CreateCommentHandler, GetCommentsHandler],
})
export class CommentsModule {}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCommentCommand } from './createCommand.command';
import { InjectRepository } from '@nestjs/typeorm';
import Comment from 'src/comment/comment.entity';
import { Repository } from 'typeorm';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler
  implements ICommandHandler<CreateCommentCommand>
{
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async execute(command: CreateCommentCommand) {
    const newPost = await this.commentsRepository.create({
      ...command.comment,
      author: command.author,
    });
    await this.commentsRepository.save(newPost);
    return newPost;
  }
}

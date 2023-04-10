import { Transform } from 'class-transformer';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import User from 'src/users/user.entity';
import Category from 'src/categories/category.entity';

@Entity()
class Post {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @ManyToMany(() => Category)
  @JoinTable()
  public categories?: Category[];

  @Column('text', { array: true })
  public paragraphs: string[];

  @Index('post_authorId_index')
  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;
}

export default Post;

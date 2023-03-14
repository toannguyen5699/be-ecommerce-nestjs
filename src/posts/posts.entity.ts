import { Transform } from 'class-transformer';
import {
  Column,
  Entity,
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

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;
}

export default Post;

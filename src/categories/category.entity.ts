import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import Post from 'src/posts/posts.entity';

@Entity()
class Category {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column()
  public name: string;

  @ManyToMany(() => Post, (post: Post) => post.categories)
  public posts: Post[];
}

export default Category;

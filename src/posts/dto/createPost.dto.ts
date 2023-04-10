import { IsString, IsNotEmpty } from 'class-validator';
export default class CreatePostDto {
  content: string;
  title: string;
  @IsString({ each: true })
  @IsNotEmpty()
  paragraphs: string[];
}

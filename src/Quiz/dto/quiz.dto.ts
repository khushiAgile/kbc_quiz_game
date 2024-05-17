import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QuizDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

export class AnswerDTO extends QuizDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  answer: string;
}

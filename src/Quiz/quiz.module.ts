import { Module, OnModuleInit } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/Common/entity/quiz.entity';
import { Lifeline } from 'src/Common/entity/lifeline.entity';
import { User } from 'src/Common/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Lifeline, User])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule implements OnModuleInit {
  constructor(private quizService: QuizService) {}

  onModuleInit() {
    const quiz = this.quizService.createQuiz();
    const lifeLine = this.quizService.createLifeLine();
    return [quiz, lifeLine];
  }
}

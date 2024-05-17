import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuizService } from './quiz.service';
import { AnswerDTO, QuizDTO } from './dto/quiz.dto';
import { ResponseMassage } from '../Common/decorator/response.decorater';
import {
  CHANGE_STATUS,
  CORRECT_ANSWER,
  QUIT_GAME,
  QUIZ_FETCH,
} from '../utils/constans/sucessMassage';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post()
  @ResponseMassage(QUIZ_FETCH)
  @HttpCode(HttpStatus.OK)
  rendomQuiz(@Body() quizDTO: QuizDTO) {
    return this.quizService.rendomQuiz(quizDTO);
  }

  @Post('/answer')
  @HttpCode(HttpStatus.OK)
  @ResponseMassage(CORRECT_ANSWER)
  checkAnswer(@Body() answerDTO: AnswerDTO) {
    return this.quizService.checkAnswer(answerDTO);
  }

  @Post('/status')
  @HttpCode(HttpStatus.OK)
  @ResponseMassage(QUIT_GAME)
  quitGame(@Body() userID: QuizDTO) {
    return this.quizService.quitGame(userID);
  }

  @Post('/status')
  @HttpCode(HttpStatus.OK)
  @ResponseMassage(CHANGE_STATUS)
  changeStatus(@Body() userID: QuizDTO) {
    return this.quizService.changeStatus(userID);
  }
}

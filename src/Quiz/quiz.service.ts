import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from '../Common/entity/quiz.entity';
import { CustomError } from '../Common/helpers/exceptions';
import { QUIZ_DATA } from '../Common/seedData/quiz';
import { Repository } from 'typeorm';
import { AnswerDTO, QuizDTO } from './dto/quiz.dto';
import { Lifeline } from '../Common/entity/lifeline.entity';
import { LIFE_LINE_DATA } from '../Common/seedData/lifeLine';
import { getRandomQuiz, setPriseMoney } from '../utils';
import { User } from '../Common/entity/user.entity';
import { QuizStatus } from '../Common/type';
import { QuizError } from '../Common/helpers/quizException';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,

    @InjectRepository(Lifeline)
    private readonly lifeLineRepository: Repository<Lifeline>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUser(userId: number) {
    try {
      const findUser = await this.userRepository.findOneBy({ id: userId });

      if (!findUser) {
        throw QuizError.UserNotFound();
      }

      return findUser;
    } catch (err) {
      throw CustomError.customException(
        err.message,
        err.statusCode ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createQuiz() {
    try {
      const findQuiz = await this.quizRepository.find();

      if (findQuiz.length > 0) {
        return true;
      }

      return await this.quizRepository.save(QUIZ_DATA);
    } catch (err) {
      throw CustomError.customException(
        err.message,
        err.statusCode ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createLifeLine() {
    try {
      const findLifeLine = await this.lifeLineRepository.find();

      if (findLifeLine.length > 0) {
        return true;
      }

      return await this.lifeLineRepository.save(LIFE_LINE_DATA);
    } catch (err) {
      throw CustomError.customException(
        err.message,
        err.statusCode ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  async rendomQuiz(quizDTO: QuizDTO) {
    try {
      const findUser = await this.findUser(quizDTO.userId);

      if (findUser?.currentLevel !== (findUser?.questionId?.length ?? 0)) {
        throw QuizError.ClearPreQus();
      }

      if (findUser.status === QuizStatus.Forfeited) {
        throw QuizError.PlayNotMore();
      }

      if (findUser.status === QuizStatus.Completed) {
        throw QuizError.WinGame({ currentLevel: findUser.currentLevel });
      }

      const findQuiz = await this.quizRepository
        .createQueryBuilder('quiz')
        .select(['quiz.id', 'quiz.question', 'quiz.options'])
        .getMany();

      const findRemainingValue = findQuiz?.filter(
        (a) => !findUser?.questionId?.includes(a.id),
      );

      const findRandomQuiz = getRandomQuiz(findRemainingValue.slice());

      return {
        ...findRandomQuiz,
        currentLevel: findUser.currentLevel,
        usedLifelines: findUser.usedLifelines ?? null,
      };
    } catch (err) {
      throw CustomError.customException(
        err.message,
        err?.response?.statusCode ?? HttpStatus.BAD_REQUEST,
        err?.response?.data,
      );
    }
  }

  async checkAnswer(answerDTO: AnswerDTO) {
    try {
      const findQuestion = await this.quizRepository
        .createQueryBuilder('quiz')
        .select(['quiz.id', 'quiz.question', 'quiz.answer'])
        .where('quiz.id = :id', { id: answerDTO.questionId })
        .getOne();

      const findUser = await this.findUser(answerDTO.userId);

      if (findUser.status === QuizStatus.Forfeited) {
        throw QuizError.PlayNotMore();
      }

      if (findUser.status === QuizStatus.Completed) {
        throw QuizError.WinGame({ currentLevel: findUser.currentLevel });
      }

      if (findQuestion.answer === answerDTO.answer) {
        await this.userRepository.save({
          id: answerDTO.userId,
          ...findUser,
          questionId: [...(findUser.questionId ?? []), answerDTO.questionId],
          currentLevel: findUser.currentLevel + 1,
          prizeMoney: setPriseMoney(
            findUser.currentLevel + 1,
            findUser.prizeMoney,
          ),
          status: findUser.currentLevel + 1 === 9 ? QuizStatus.Completed : null,
        });
      } else {
        await this.userRepository.save({
          id: answerDTO.userId,
          ...findUser,
          status: QuizStatus.Forfeited,
        });
        throw QuizError.IncorrectAnswer(findQuestion);
      }

      return findQuestion;
    } catch (err) {
      throw CustomError.customException(
        err.message,
        err?.response?.statusCode ?? HttpStatus.BAD_REQUEST,
        err?.response?.data,
      );
    }
  }

  async changeStatus(quizDTO: QuizDTO) {
    try {
      const findUser = await this.findUser(quizDTO.userId);

      if (findUser.status) {
        throw QuizError.StatusAssigned();
      }

      return await this.userRepository.save({
        id: quizDTO.userId,
        ...findUser,
        status: QuizStatus.Forfeited,
      });
    } catch (err) {
      throw CustomError.customException(
        err.message,
        err.statusCode ?? HttpStatus.BAD_REQUEST,
        err?.response?.data,
      );
    }
  }

  async quitGame(quizDTO: QuizDTO) {
    try {
      const findUser = await this.findUser(quizDTO.userId);

      if (findUser.status) {
        throw QuizError.StatusAssigned();
      }

      if (findUser.currentLevel <= 4) {
        throw QuizError.NotQuitGame();
      }

      return await this.userRepository.save({
        id: quizDTO.userId,
        ...findUser,
        status: QuizStatus.Forfeited,
      });
    } catch (err) {
      throw CustomError.customException(
        err.message,
        err.statusCode ?? HttpStatus.BAD_REQUEST,
        err?.response?.data,
      );
    }
  }
}

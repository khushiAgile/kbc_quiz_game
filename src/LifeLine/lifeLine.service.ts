import { HttpStatus, Injectable } from '@nestjs/common';
import { LifelineDTO } from './dto/lifeLine.dto';
import { CustomError } from '../Common/helpers/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Lifeline } from '../Common/entity/lifeline.entity';
import { Repository } from 'typeorm';
import { User } from '../Common/entity/user.entity';
import { Quiz } from '../Common/entity/quiz.entity';
import { getLifelineAns } from '../utils';
import { QuizError } from '../Common/helpers/quizException';

@Injectable()
export class LifeLineService {
  constructor(
    @InjectRepository(Lifeline)
    private readonly lifelineRepository: Repository<Lifeline>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
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

  async lifelineList() {
    try {
      return await this.lifelineRepository.find();
    } catch (err) {
      throw CustomError.customException(
        err.message,
        err.statusCode ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  async chooseLifeline(lifelineDTO: LifelineDTO) {
    try {
      const findLifeline = await this.lifelineRepository.findOneBy({
        id: lifelineDTO.lifelineId,
      });

      if (!findLifeline) {
        throw QuizError.LifelineNotFound();
      }

      const findUser = await this.findUser(lifelineDTO.userId);
      const findQuestion = await this.quizRepository.findOneBy({
        id: lifelineDTO.questionId,
      });

      if (findUser.questionId?.includes(lifelineDTO.questionId)) {
        throw QuizError.QuestionNotFound();
      }

      if (findUser.usedLifelines?.includes(lifelineDTO.lifelineId)) {
        throw QuizError.LifelineUsed();
      }
      await this.userRepository.save({
        id: lifelineDTO.userId,
        ...findUser,
        usedLifelines: [
          ...(findUser.usedLifelines ?? []),
          Number(lifelineDTO.lifelineId),
        ],
      });

      if (findLifeline.lifeLine === '50-50') {
        const getOption = getLifelineAns(
          findQuestion.options,
          findQuestion.answer,
        );
        const result = { ...findQuestion, options: getOption };
        delete result.answer;
        return result;
      }

      if (findLifeline.lifeLine === 'Ask The AI') {
        return { ...findQuestion, answer: findQuestion.answer };
      }
    } catch (err) {
      throw CustomError.customException(
        err.message,
        err.statusCode ?? HttpStatus.BAD_REQUEST,
      );
    }
  }
}

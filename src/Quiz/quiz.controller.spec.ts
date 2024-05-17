import { Test, TestingModule } from '@nestjs/testing';
import { TEST_CASES_JEST_TIMEOUT } from '../utils/constans';
import { RESPONSE_SUCCESS } from '../utils/constans/sucessMassage';
import { HttpStatus } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { QuizModel } from './test/quiz.model';
import { Quiz } from '../Common/entity/quiz.entity';
import { AnswerDTO, QuizDTO } from './dto/quiz.dto';

describe('Quiz Controller', () => {
  let controller: QuizController, service: QuizService, quizModel: QuizModel;

  beforeEach(async () => {
    jest.setTimeout(TEST_CASES_JEST_TIMEOUT);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizController],
      providers: [
        {
          provide: QuizService,
          useValue: {
            rendomQuiz: jest.fn().mockResolvedValue({
              message: RESPONSE_SUCCESS,
              data: {},
              status: HttpStatus.OK,
            }),
            checkAnswer: jest.fn().mockResolvedValue({
              message: RESPONSE_SUCCESS,
              data: {},
              status: HttpStatus.OK,
            }),
            changeStatus: jest.fn().mockResolvedValue({
              message: RESPONSE_SUCCESS,
              data: {},
              status: HttpStatus.OK,
            }),
            quitGame: jest.fn().mockResolvedValue({
              message: RESPONSE_SUCCESS,
              data: {},
              status: HttpStatus.OK,
            }),
          },
        },
        {
          provide: getRepositoryToken(Quiz),
          useClass: QuizModel,
        },
      ],
    }).compile();

    controller = module.get<QuizController>(QuizController);
    service = module.get<QuizService>(QuizService);
    quizModel = module.get<QuizModel>(getRepositoryToken(Quiz));
  });

  it('User controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('User service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('User Model should be defined', () => {
    expect(quizModel).toBeDefined();
  });

  describe('rendom quiz  ', () => {
    const rendomQuizData: QuizDTO = {
      userId: 1,
    };
    it('should render rendom quiz successfully', async () => {
      await expect(controller.rendomQuiz(rendomQuizData)).resolves.toEqual({
        status: HttpStatus.OK,
        message: RESPONSE_SUCCESS,
        data: {},
      });
    });
  });

  describe('check Answer  ', () => {
    const checkAnswerData: AnswerDTO = {
      answer: '2',
      questionId: 1,
      userId: 1,
    };
    it('should check answer successfully', async () => {
      await expect(controller.checkAnswer(checkAnswerData)).resolves.toEqual({
        status: HttpStatus.OK,
        message: RESPONSE_SUCCESS,
        data: {},
      });
    });
  });

  describe('change status  ', () => {
    const changeStatusData: QuizDTO = {
      userId: 1,
    };
    it('should change status successfully', async () => {
      await expect(controller.changeStatus(changeStatusData)).resolves.toEqual({
        status: HttpStatus.OK,
        message: RESPONSE_SUCCESS,
        data: {},
      });
    });
  });

  describe('quit game  ', () => {
    const quitGameData: QuizDTO = {
      userId: 1,
    };
    it('quit game successfully', async () => {
      await expect(controller.quitGame(quitGameData)).resolves.toEqual({
        status: HttpStatus.OK,
        message: RESPONSE_SUCCESS,
        data: {},
      });
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { TEST_CASES_JEST_TIMEOUT } from '../utils/constans';
import { RESPONSE_SUCCESS } from '../utils/constans/sucessMassage';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { QuizModel } from './test/quiz.model';
import { Quiz } from '../Common/entity/quiz.entity';
import { AnswerDTO, QuizDTO } from './dto/quiz.dto';

export const handlingErrorFunc = (error) => {
  const expectedError = {
    statusCode: error.status,
    message: error.message,
    data: {},
  };

  expect(error.status).toEqual(expectedError.statusCode);
  expect(error.message).toEqual(expectedError.message);
  expect({}).toEqual(expectedError.data);
};

describe('Quiz Service', () => {
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

  it('Quiz controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Quiz service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Quiz Model should be defined', () => {
    expect(quizModel).toBeDefined();
  });

  describe('rendom quiz ', () => {
    const rendomQuizData: QuizDTO = {
      userId: 1,
    };
    it('should render rendom quiz successfully', async () => {
      const userEntity = new Quiz();
      jest.spyOn(quizModel, 'save').mockReturnValue(userEntity as never);

      const result = await service.rendomQuiz(rendomQuizData);

      // Expectations
      expect(result).toEqual({
        message: RESPONSE_SUCCESS,
        data: {},
        status: 200,
      });
    });

    it('should handle unknown errors', async () => {
      try {
        await service.rendomQuiz(rendomQuizData);
        jest.spyOn(quizModel, 'create').mockImplementation(() => {
          throw new Error('Unknown Error');
        });
        jest.spyOn(quizModel, 'save').mockReturnValue(new Quiz() as never);
      } catch (error) {
        // Expectations
        expect(quizModel.save).not.toHaveBeenCalled();
        expect(500).toHaveBeenCalledWith(500);
      }
    });
  });

  describe('check aswer ', () => {
    const checkAnswerData: AnswerDTO = {
      answer: '2',
      questionId: 1,
      userId: 1,
    };
    it('should check answer successfully', async () => {
      const userEntity = new Quiz();
      jest.spyOn(quizModel, 'save').mockReturnValue(userEntity as never);

      const result = await service.checkAnswer(checkAnswerData);

      // Expectations
      expect(result).toEqual({
        message: RESPONSE_SUCCESS,
        data: {},
        status: 200,
      });
    });

    it('should handle unknown errors', async () => {
      try {
        await service.checkAnswer(checkAnswerData);
        jest.spyOn(quizModel, 'create').mockImplementation(() => {
          throw new Error('Unknown Error');
        });
        jest.spyOn(quizModel, 'save').mockReturnValue(new Quiz() as never);
      } catch (error) {
        // Expectations
        expect(quizModel.save).not.toHaveBeenCalled();
        expect(500).toHaveBeenCalledWith(500);
      }
    });
  });

  describe('change status ', () => {
    const changeStatusData: QuizDTO = {
      userId: 1,
    };
    it('should change status successfully', async () => {
      const userEntity = new Quiz();
      jest.spyOn(quizModel, 'save').mockReturnValue(userEntity as never);

      const result = await service.changeStatus(changeStatusData);

      // Expectations
      expect(result).toEqual({
        message: RESPONSE_SUCCESS,
        data: {},
        status: 200,
      });
    });

    it('should handle unknown errors', async () => {
      try {
        await service.changeStatus(changeStatusData);
        jest.spyOn(quizModel, 'create').mockImplementation(() => {
          throw new Error('Unknown Error');
        });
        jest.spyOn(quizModel, 'save').mockReturnValue(new Quiz() as never);
      } catch (error) {
        // Expectations
        expect(quizModel.save).not.toHaveBeenCalled();
        expect(500).toHaveBeenCalledWith(500);
      }
    });
  });

  describe('quit game ', () => {
    const quitGameData: QuizDTO = {
      userId: 1,
    };
    it('quit game successfully', async () => {
      const userEntity = new Quiz();
      jest.spyOn(quizModel, 'save').mockReturnValue(userEntity as never);

      const result = await service.quitGame(quitGameData);

      // Expectations
      expect(result).toEqual({
        message: RESPONSE_SUCCESS,
        data: {},
        status: 200,
      });
    });

    it('should handle unknown errors', async () => {
      try {
        await service.quitGame(quitGameData);
        jest.spyOn(quizModel, 'create').mockImplementation(() => {
          throw new Error('Unknown Error');
        });
        jest.spyOn(quizModel, 'save').mockReturnValue(new Quiz() as never);
      } catch (error) {
        // Expectations
        expect(quizModel.save).not.toHaveBeenCalled();
        expect(500).toHaveBeenCalledWith(500);
      }
    });
  });
});

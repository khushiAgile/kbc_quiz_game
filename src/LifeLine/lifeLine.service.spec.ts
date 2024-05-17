import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { LifeLineController } from './lifeLine.controller';
import { LifeLineService } from './lifeLine.service';
import { TEST_CASES_JEST_TIMEOUT } from '../utils/constans';
import {
  LIFE_LINE_CHOOSE,
  RESPONSE_SUCCESS,
} from '../utils/constans/sucessMassage';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Lifeline } from '../Common/entity/lifeline.entity';
import { LifelineModel } from './test/lifeline.model';
import { LifelineDTO } from './dto/lifeLine.dto';

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

describe('LifelineService', () => {
  let controller: LifeLineController,
    service: LifeLineService,
    lifelineModel: LifelineModel;

  beforeEach(async () => {
    jest.setTimeout(TEST_CASES_JEST_TIMEOUT);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LifeLineController],
      providers: [
        {
          provide: LifeLineService,
          useValue: {
            lifelineList: jest.fn().mockResolvedValue({
              message: RESPONSE_SUCCESS,
              data: {},
              status: HttpStatus.OK,
            }),
            chooseLifeline: jest.fn().mockResolvedValue({
              status: HttpStatus.OK,
              message: LIFE_LINE_CHOOSE,
              data: {},
            }),
          },
        },
        {
          provide: getRepositoryToken(Lifeline),
          useClass: LifelineModel,
        },
      ],
    }).compile();

    controller = module.get<LifeLineController>(LifeLineController);
    service = module.get<LifeLineService>(LifeLineService);
    lifelineModel = module.get<LifelineModel>(getRepositoryToken(Lifeline));
  });

  it('Lifeline controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Lifeline service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Lifeline Model should be defined', () => {
    expect(lifelineModel).toBeDefined();
  });

  describe('list lifeline ', () => {
    it('should list of lifeline successfully', async () => {
      const LifelineEntity = new Lifeline();
      jest
        .spyOn(lifelineModel, 'save')
        .mockReturnValue(LifelineEntity as never);

      const result = await service.lifelineList();

      // Expectations
      expect(result).toEqual({
        message: RESPONSE_SUCCESS,
        data: {},
        status: 200,
      });
    });

    it('should handle unknown errors', async () => {
      try {
        await service.lifelineList();
        jest.spyOn(lifelineModel, 'create').mockImplementation(() => {
          throw new Error('Unknown Error');
        });
        jest
          .spyOn(lifelineModel, 'save')
          .mockReturnValue(new Lifeline() as never);
      } catch (error) {
        // Expectations
        expect(lifelineModel.save).not.toHaveBeenCalled();
        expect(500).toHaveBeenCalledWith(500);
      }
    });
  });

  describe('Choose lifeline ', () => {
    const lifeLineData: LifelineDTO = {
      lifelineId: 1,
      questionId: 1,
      userId: 1,
    };

    it('Choose lifeline successfully', async () => {
      const LifelineEntity = new Lifeline();
      jest
        .spyOn(lifelineModel, 'save')
        .mockReturnValue(LifelineEntity as never);

      const result = await service.chooseLifeline(lifeLineData);

      // Expectations
      expect(result).toEqual({
        message: LIFE_LINE_CHOOSE,
        data: {},
        status: 200,
      });
    });

    it('should handle unknown errors', async () => {
      try {
        await service.chooseLifeline(lifeLineData);
        jest.spyOn(lifelineModel, 'create').mockImplementation(() => {
          throw new Error('Unknown Error');
        });
        jest
          .spyOn(lifelineModel, 'save')
          .mockReturnValue(new Lifeline() as never);
      } catch (error) {
        // Expectations
        expect(lifelineModel.save).not.toHaveBeenCalled();
        expect(500).toHaveBeenCalledWith(500);
      }
    });
  });
});

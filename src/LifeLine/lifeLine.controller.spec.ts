import { Test, TestingModule } from '@nestjs/testing';
import { LifeLineController } from './lifeLine.controller';
import { LifeLineService } from './lifeLine.service';
import { LifelineModel } from './test/lifeline.model';
import { TEST_CASES_JEST_TIMEOUT } from '../utils/constans';
import {
  LIFE_LINE_CHOOSE,
  RESPONSE_SUCCESS,
} from '../utils/constans/sucessMassage';
import { HttpStatus } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Lifeline } from '../Common/entity/lifeline.entity';
import { LifelineDTO } from './dto/lifeLine.dto';

describe('Lifeline Controller', () => {
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

  it('lifeline controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('lifeline service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('lifeline Model should be defined', () => {
    expect(lifelineModel).toBeDefined();
  });

  describe('list lifeline  ', () => {
    it('should list of lifeline successfully', async () => {
      //Compare the actual response with the expected response
      await expect(controller.lifelineList()).resolves.toEqual({
        status: HttpStatus.OK,
        message: RESPONSE_SUCCESS,
        data: {},
      });
    });
  });

  describe('Choose lifeline ', () => {
    const lifeLineData: LifelineDTO = {
      lifelineId: 1,
      questionId: 1,
      userId: 1,
    };

    it('Choose lifeline successfully', async () => {
      //Compare the actual response with the expected response
      await expect(controller.chooceLifeline(lifeLineData)).resolves.toEqual({
        status: HttpStatus.OK,
        message: LIFE_LINE_CHOOSE,
        data: {},
      });
    });
  });
});

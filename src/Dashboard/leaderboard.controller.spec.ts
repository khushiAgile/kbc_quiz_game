import { Test, TestingModule } from '@nestjs/testing';
import { TEST_CASES_JEST_TIMEOUT } from '../utils/constans';
import { RESPONSE_SUCCESS } from '../utils/constans/sucessMassage';
import { HttpStatus } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './leaderboard.service';
import { LeaderBoardModel } from './test/leaderboard.model';
import { User } from '../Common/entity/user.entity';

describe('Leaderboard Controller', () => {
  let controller: LeaderboardController,
    service: LeaderboardService,
    leaderBoardModel: LeaderBoardModel;

  beforeEach(async () => {
    jest.setTimeout(TEST_CASES_JEST_TIMEOUT);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaderboardController],
      providers: [
        {
          provide: LeaderboardService,
          useValue: {
            leaderboardList: jest.fn().mockResolvedValue({
              message: RESPONSE_SUCCESS,
              data: {},
              status: HttpStatus.OK,
            }),
          },
        },
        {
          provide: getRepositoryToken(User),
          useClass: LeaderBoardModel,
        },
      ],
    }).compile();

    controller = module.get<LeaderboardController>(LeaderboardController);
    service = module.get<LeaderboardService>(LeaderboardService);
    leaderBoardModel = module.get<LeaderBoardModel>(getRepositoryToken(User));
  });

  it('leadboard controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('leadboard service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('leadboard Model should be defined', () => {
    expect(leaderBoardModel).toBeDefined();
  });

  describe('list leadboard  ', () => {
    it('should list of leadboard successfully', async () => {
      //Compare the actual response with the expected response
      await expect(controller.leaderboardList()).resolves.toEqual({
        status: HttpStatus.OK,
        message: RESPONSE_SUCCESS,
        data: {},
      });
    });
  });
});

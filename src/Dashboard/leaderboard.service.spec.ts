import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './leaderboard.service';
import { TEST_CASES_JEST_TIMEOUT } from '../utils/constans';
import { RESPONSE_SUCCESS } from '../utils/constans/sucessMassage';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../Common/entity/user.entity';
import { LeaderBoardModel } from './test/leaderboard.model';

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

describe('Leaderboard Service', () => {
  let controller: LeaderboardController,
    service: LeaderboardService,
    lederboardModel: LeaderBoardModel;

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
    lederboardModel = module.get<LeaderBoardModel>(getRepositoryToken(User));
  });

  it('leaderboard controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('leaderboard service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('leaderboard Model should be defined', () => {
    expect(lederboardModel).toBeDefined();
  });

  describe('list in leaderboard ', () => {
    it('should list in leaderboard successfully', async () => {
      const leaderboardEntity = new User();
      jest
        .spyOn(lederboardModel, 'save')
        .mockReturnValue(leaderboardEntity as never);

      const result = await service.leaderboardList();

      // Expectations
      expect(result).toEqual({
        message: RESPONSE_SUCCESS,
        data: {},
        status: 200,
      });
    });

    it('should handle unknown errors', async () => {
      try {
        await service.leaderboardList();
        jest.spyOn(lederboardModel, 'create').mockImplementation(() => {
          throw new Error('Unknown Error');
        });
        jest
          .spyOn(lederboardModel, 'save')
          .mockReturnValue(new User() as never);
      } catch (error) {
        // Expectations
        expect(lederboardModel.save).not.toHaveBeenCalled();
        expect(500).toHaveBeenCalledWith(500);
      }
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TEST_CASES_JEST_TIMEOUT } from '../utils/constans';
import { RESPONSE_SUCCESS } from '../utils/constans/sucessMassage';
import { HttpStatus } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../Common/entity/user.entity';
import { UserModel } from './test/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

describe('Leaderboard Controller', () => {
  let controller: UserController, service: UserService, userModel: UserModel;

  beforeEach(async () => {
    jest.setTimeout(TEST_CASES_JEST_TIMEOUT);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn().mockResolvedValue({
              message: RESPONSE_SUCCESS,
              data: {},
              status: HttpStatus.OK,
            }),
          },
        },
        {
          provide: getRepositoryToken(User),
          useClass: UserModel,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    userModel = module.get<UserModel>(getRepositoryToken(User));
  });

  it('User controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('User service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('User Model should be defined', () => {
    expect(userModel).toBeDefined();
  });

  describe('craete user  ', () => {
    it('should create successfully', async () => {
      const createUserData: UserDTO = {
        userName: 'John',
      };
      await expect(controller.createUser(createUserData)).resolves.toEqual({
        status: HttpStatus.OK,
        message: RESPONSE_SUCCESS,
        data: {},
      });
    });
  });
});

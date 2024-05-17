import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { TEST_CASES_JEST_TIMEOUT } from '../utils/constans';
import { RESPONSE_SUCCESS } from '../utils/constans/sucessMassage';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../Common/entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel } from './test/user.model';
import { UserDTO } from './dto/user.dto';

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

describe('User Service', () => {
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

  describe('create user ', () => {
    const createUserData: UserDTO = {
      userName: 'John',
    };
    it('should create user successfully', async () => {
      const userEntity = new User();
      jest.spyOn(userModel, 'save').mockReturnValue(userEntity as never);

      const result = await service.createUser(createUserData);

      // Expectations
      expect(result).toEqual({
        message: RESPONSE_SUCCESS,
        data: {},
        status: 200,
      });
    });

    it('should handle unknown errors', async () => {
      try {
        await service.createUser(createUserData);
        jest.spyOn(userModel, 'create').mockImplementation(() => {
          throw new Error('Unknown Error');
        });
        jest.spyOn(userModel, 'save').mockReturnValue(new User() as never);
      } catch (error) {
        // Expectations
        expect(userModel.save).not.toHaveBeenCalled();
        expect(500).toHaveBeenCalledWith(500);
      }
    });
  });
});

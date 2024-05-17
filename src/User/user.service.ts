import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomError } from '../Common/helpers/exceptions';
import { UserDTO } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../Common/entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepositroy: Repository<User>,
  ) {}

  async createUser(userDTO: UserDTO) {
    try {
      return await this.userRepositroy.save(userDTO);
    } catch (err) {
      throw CustomError.customException(
        err.message,
        err.statusCode ?? HttpStatus.BAD_REQUEST,
      );
    }
  }
}

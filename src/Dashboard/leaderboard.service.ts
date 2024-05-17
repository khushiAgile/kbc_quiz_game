import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Common/entity/user.entity';
import { CustomError } from '../Common/helpers/exceptions';
import { Repository } from 'typeorm';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async leaderboardList() {
    try {
      const userList = await this.userRepository
        .createQueryBuilder('user')
        .select([
          'user.userName',
          'user.prizeMoney',
          'user.status',
          'user.createDate',
        ])
        .where('user.status is not null')
        .orderBy('user.prizeMoney', 'DESC')
        .getMany();

      return userList;
    } catch (err) {
      throw CustomError.customException(
        err.message,
        err.statusCode ?? HttpStatus.BAD_REQUEST,
      );
    }
  }
}

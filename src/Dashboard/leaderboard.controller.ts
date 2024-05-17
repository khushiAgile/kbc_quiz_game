import { Controller, Get } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMassage } from '../Common/decorator/response.decorater';
import { RESPONSE_SUCCESS } from '../utils/constans/sucessMassage';

@ApiTags('Leaderboard')
@Controller('leaderboard')
export class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  @Get()
  @ResponseMassage(RESPONSE_SUCCESS)
  leaderboardList() {
    return this.leaderboardService.leaderboardList();
  }
}

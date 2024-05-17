import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LifeLineService } from './lifeLine.service';
import { LifelineDTO } from './dto/lifeLine.dto';
import { ResponseMassage } from '../Common/decorator/response.decorater';
import {
  LIFE_LINE_CHOOSE,
  RESPONSE_SUCCESS,
} from '../utils/constans/sucessMassage';

@Controller('lifeline')
@ApiTags('Lifeline')
export class LifeLineController {
  constructor(private lifelineService: LifeLineService) {}

  @Get()
  @ResponseMassage(RESPONSE_SUCCESS)
  lifelineList() {
    return this.lifelineService.lifelineList();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ResponseMassage(LIFE_LINE_CHOOSE)
  chooceLifeline(@Body() lifelineDTO: LifelineDTO) {
    return this.lifelineService.chooseLifeline(lifelineDTO);
  }
}

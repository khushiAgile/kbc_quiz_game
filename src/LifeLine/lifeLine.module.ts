import { Module } from '@nestjs/common';
import { LifeLineService } from './lifeLine.service';
import { LifeLineController } from './lifeLine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Common/entity/user.entity';
import { Lifeline } from 'src/Common/entity/lifeline.entity';
import { Quiz } from 'src/Common/entity/quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Lifeline, Quiz])],
  controllers: [LifeLineController],
  providers: [LifeLineService],
})
export class LifeLineModule {}

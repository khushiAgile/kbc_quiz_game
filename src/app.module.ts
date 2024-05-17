import { Module } from '@nestjs/common';
import { DatabaseModule } from './Provider/Database/database.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppIntercepter } from './Common/interceptors/app.interceptors';
import { UserModule } from './User/user.module';
import { QuizModule } from './Quiz/quiz.module';
import { LifeLineModule } from './LifeLine/lifeLine.module';
import { LeaderboardModule } from './Dashboard/leaderboard.module';

@Module({
  imports: [
    UserModule,
    QuizModule,
    LifeLineModule,
    LeaderboardModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AppIntercepter,
    },
  ],
})
export class AppModule {}

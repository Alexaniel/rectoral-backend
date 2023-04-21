import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WelcomePhrasesModule } from './modules/welcome-phrases/welcome-phrases.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RECTORAL_MONGO_URI } from './config/environments';
import { SupportersModule } from './modules/supporters/supporters.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(RECTORAL_MONGO_URI),
    WelcomePhrasesModule,
    SupportersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

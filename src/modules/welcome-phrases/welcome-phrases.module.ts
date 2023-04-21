import { Module } from '@nestjs/common';
import { WelcomePhrasesController } from './welcome-phrases.controller';
import { WelcomePhrasesService } from './welcome-phrases.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [WelcomePhrasesController],
  providers: [WelcomePhrasesService],
})
export class WelcomePhrasesModule {}

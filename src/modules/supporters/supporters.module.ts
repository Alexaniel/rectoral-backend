import { Module } from '@nestjs/common';
import { SupportersController } from './supporters.controller';
import { SupportersService } from './supporters.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Supporter, SupporterSchema } from 'src/schemas/supporter.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Supporter.name,
        useFactory: () => {
          const schema = SupporterSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [SupportersController],
  providers: [SupportersService],
})
export class SupportersModule {}

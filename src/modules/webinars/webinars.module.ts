import { Module } from '@nestjs/common';
import { WebinarsController } from './webinars.controller';
import { WebinarsService } from './webinars.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Webinar, WebinarSchema } from 'src/schemas/webinar.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import {
  WebinarCategory,
  WebinarCategorySchema,
} from 'src/schemas/webinar-category.schema';
import {
  ChannelTransmission,
  ChannelTransmissionSchema,
} from 'src/schemas/transmission-channel.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Webinar.name,
        useFactory: () => {
          const schema = WebinarSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
      {
        name: WebinarCategory.name,
        useFactory: () => {
          const schema = WebinarCategorySchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
      {
        name: ChannelTransmission.name,
        useFactory: () => {
          const schema = ChannelTransmissionSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [WebinarsController],
  providers: [WebinarsService],
})
export class WebinarsModule {}

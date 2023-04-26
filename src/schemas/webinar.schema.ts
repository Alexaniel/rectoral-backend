import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { WebinarCategory } from './webinar-category.schema';
import { ChannelTransmission } from './transmission-channel.schema';

export type WebinarDocument = Webinar & Document;

@Schema({ timestamps: false, _id: false, versionKey: false })
export class Banner {
  @Prop({ type: Object })
  banner: {
    original: string;
    thumbnail: string;
  };
}

@Schema({ timestamps: false, _id: false, versionKey: false })
export class Schedule {
  @Prop({ type: Object })
  schedule: {
    country: string;
    time: string;
  };
}

@Schema({ timestamps: false, _id: false, versionKey: false })
export class Video {
  @Prop({ type: Object })
  video: {
    link: string;
    frame: string;
    isAvailable: boolean;
  };
}

@Schema({ timestamps: true })
export class Webinar {
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  date: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: WebinarCategory.name,
    autopopulate: true,
    default: null,
  })
  categoryID: WebinarCategory;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    default: null,
  })
  interviewerID: User;

  @Prop()
  interviewersIds: User[];

  @Prop()
  transmissionChannels: ChannelTransmission[];

  @Prop()
  isAvailable: boolean;

  @Prop()
  isNext: boolean;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    default: null,
  })
  moderatorID: User;

  @Prop()
  registerLink: string;

  @Prop({
    type: Array,
    default: [],
  })
  schedules: Schedule[];

  @Prop()
  survey: string;

  @Prop()
  tag: string;

  @Prop({
    type: Object,
    default: {
      link: '',
      frame: '',
      isAvailable: false,
    },
  })
  video: Video;

  @Prop({
    type: Object,
    default: {
      original: '',
      thumbnail: '',
    },
  })
  banner: Banner;

  @Prop({
    type: Array,
    default: [],
  })
  topic: string[];

  @Prop({
    type: Array,
    default: [],
  })
  summary: string[];
}

export const WebinarSchema = SchemaFactory.createForClass(Webinar);

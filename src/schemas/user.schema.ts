import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: false, _id: false, versionKey: false })
export class Academic {
  @Prop({
    type: Object,
  })
  academic: {
    jobPosition: string;
    institute: string;
    instituteType: string;
    designation: string;
    biography: string;
    curriculum: string;
    languages: string[];
  };
}

@Schema({ timestamps: false, _id: false, versionKey: false })
export class Slogan {
  @Prop({ type: Object })
  slogan: {
    content: string;
    isRequired: boolean;
  };
}

@Schema({ timestamps: false, _id: false, versionKey: false })
export class Image {
  @Prop({ type: Object })
  image: {
    original: string;
    thumbnail: boolean;
  };
}

@Schema({ timestamps: true })
export class User {
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ trim: true, index: true, default: null, sparse: true })
  name: string;

  @Prop({ trim: true, default: '' })
  lastName: string;

  @Prop()
  country: string;

  @Prop({
    type: Object,
    default: {
      original: '',
      thumbnail: '',
    },
  })
  image: Image;

  @Prop({
    type: Object,
    default: {
      content: '',
      isRequired: false,
    },
  })
  slogan: {
    content: string;
    isRequired: boolean;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

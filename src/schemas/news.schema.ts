import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type NewsDocument = News & Document;

@Schema({ timestamps: false, _id: false, versionKey: false })
export class Image {
  @Prop({ type: Object })
  image: {
    original: string;
    thumbnail: string;
  };
}

@Schema({ timestamps: true })
export class News {
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ trim: true, index: true, default: null, sparse: true })
  title: string[];

  @Prop()
  isAvailable: boolean;

  @Prop({
    type: Object,
    default: {
      original: '',
      thumbnail: '',
    },
  })
  image: Image;

  @Prop()
  date: Date;

  @Prop()
  source: string;

  @Prop()
  summary: string[];

  @Prop()
  externalLink: boolean;
}

export const NewsSchema = SchemaFactory.createForClass(News);

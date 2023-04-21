import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SupporterDocument = Supporter & Document;

@Schema({ timestamps: false, _id: false, versionKey: false })
export class Image {
  @Prop({ type: Object })
  image: {
    original: string;
    thumbnail: boolean;
  };
}

@Schema({ timestamps: true })
export class Supporter {
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ trim: true, index: true, default: null, sparse: true })
  name: string;

  @Prop({ trim: true })
  keyName: string;

  @Prop({ trim: true, index: true })
  type: string;

  @Prop()
  isAvailable: boolean;

  @Prop()
  externalLink: boolean;

  @Prop({
    type: Object,
    default: {
      original: '',
      thumbnail: '',
    },
  })
  image: Image;
}

export const SupporterSchema = SchemaFactory.createForClass(Supporter);

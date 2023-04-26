import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WebinarCategoryDocument = WebinarCategory & Document;

@Schema()
export class WebinarCategory {
  @Prop({ index: true, sparse: true })
  keyName: string;
  @Prop()
  name: string;
  @Prop()
  class: string;
  @Prop()
  logo: string;
  @Prop()
  code: number;
  @Prop()
  path: number;
}

export const WebinarCategorySchema =
  SchemaFactory.createForClass(WebinarCategory);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChannelTransmissionDocument = ChannelTransmission & Document;

@Schema()
export class ChannelTransmission {
  @Prop({ index: true, sparse: true })
  keyName: string;
  @Prop()
  name: string;
  @Prop()
  link: string;
  @Prop()
  logo: string;
  @Prop()
  code: number;
}

export const ChannelTransmissionSchema =
  SchemaFactory.createForClass(ChannelTransmission);

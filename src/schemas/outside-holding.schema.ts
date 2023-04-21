import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OutsideHoldingDocument = OutsideHolding & Document;

@Schema({ timestamps: true })
export class OutsideHolding {
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ trim: true, index: true, default: null, sparse: true })
  title: string;

  @Prop()
  isAvailable: boolean;

  @Prop()
  type: string;

  @Prop()
  modality: string;

  @Prop()
  country: string;

  @Prop()
  institute: string;

  @Prop()
  eventDate: Date;

  @Prop()
  externalLink: boolean;
}

export const OutsideHoldingSchema =
  SchemaFactory.createForClass(OutsideHolding);

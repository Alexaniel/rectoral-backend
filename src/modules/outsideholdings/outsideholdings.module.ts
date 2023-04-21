import { Module } from '@nestjs/common';
import { OutsideholdingsController } from './outsideholdings.controller';
import { OutsideholdingsService } from './outsideholdings.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OutsideHolding,
  OutsideHoldingSchema,
} from 'src/schemas/outside-holding.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: OutsideHolding.name,
        useFactory: () => {
          const schema = OutsideHoldingSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [OutsideholdingsController],
  providers: [OutsideholdingsService],
})
export class OutsideholdingsModule {}

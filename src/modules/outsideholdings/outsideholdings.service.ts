import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageMetaEntity } from 'src/common/entities/meta.entity';
import { PageEntity } from 'src/common/entities/page.entity';
import {
  OutsideHolding,
  OutsideHoldingDocument,
} from 'src/schemas/outside-holding.schema';

@Injectable()
export class OutsideholdingsService {
  _options = {
    new: true,
    upsert: true,
    lean: true,
  };

  constructor(
    @InjectModel(OutsideHolding.name)
    private readonly outsideHoldingModel: Model<OutsideHoldingDocument>,
  ) {}

  async getOutsideHoldings(pageOptionsDto: PageOptionsDto) {
    const { limit, skip, country, type, modality } = pageOptionsDto;

    const query: any = {};

    if (country) {
      query.country = country;
    }

    if (type) {
      query.type = type;
    }

    if (modality) {
      query.modality = modality;
    }

    const outsideHoldings = await this.outsideHoldingModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ eventDate: 1 })
      .exec();

    const itemCount = await this.outsideHoldingModel
      .countDocuments(query)
      .exec();
    const pageMetaDto = new PageMetaEntity({ itemCount, pageOptionsDto });

    return new PageEntity(outsideHoldings, pageMetaDto);
  }
}

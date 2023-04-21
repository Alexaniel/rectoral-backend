import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Supporter, SupporterDocument } from 'src/schemas/supporter.schema';
import { Model } from 'mongoose';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageMetaEntity } from 'src/common/entities/meta.entity';
import { PageEntity } from 'src/common/entities/page.entity';

@Injectable()
export class SupportersService {
  _options = {
    new: true,
    upsert: true,
    lean: true,
  };

  constructor(
    @InjectModel(Supporter.name)
    private readonly supporterModel: Model<SupporterDocument>,
  ) {}

  async getSupporters(pageOptionsDto: PageOptionsDto) {
    const query: any = {};

    const supporters = await this.supporterModel.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          documents: { $push: '$$ROOT' },
        },
      },
    ]);

    const itemCount = await this.supporterModel.countDocuments(query).exec();
    const pageMetaDto = new PageMetaEntity({ itemCount, pageOptionsDto });

    return new PageEntity(supporters, pageMetaDto);
  }
}

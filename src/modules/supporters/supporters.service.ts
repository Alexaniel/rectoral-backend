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
    const query: any = {
      isAvailable: true,
    };

    const match = {
      $match: query,
    };

    const group = {
      $group: {
        _id: '$type',
        count: { $sum: 1 },
        documents: { $push: '$$ROOT' },
      },
    };

    const project = {
      $project: {
        _id: 0,
        k: '$_id',
        v: { count: '$count', documents: '$documents' },
      },
    };

    const replace = {
      $replaceRoot: {
        newRoot: { $arrayToObject: [[{ k: '$k', v: '$v' }]] },
      },
    };

    const supporters = await this.supporterModel.aggregate([
      match,
      group,
      project,
      replace,
      { $group: { _id: null, data: { $mergeObjects: '$$ROOT' } } },
      { $replaceRoot: { newRoot: '$data' } },
    ]);

    const itemCount = await this.supporterModel.countDocuments(query).exec();
    const pageMetaDto = new PageMetaEntity({ itemCount, pageOptionsDto });

    return new PageEntity(supporters[0], pageMetaDto);
  }
}

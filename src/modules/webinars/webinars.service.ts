import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageMetaEntity } from 'src/common/entities/meta.entity';
import { PageEntity } from 'src/common/entities/page.entity';
import { Webinar, WebinarDocument } from 'src/schemas/webinar.schema';

@Injectable()
export class WebinarsService {
  _options = {
    new: true,
    upsert: true,
    lean: true,
  };

  constructor(
    @InjectModel(Webinar.name)
    private readonly webinarModel: Model<WebinarDocument>,
  ) {}

  async getWebinars(pageOptionsDto: PageOptionsDto) {
    const { limit, skip, category } = pageOptionsDto;
    const query: any = {
      isAvailable: true,
    };

    if (category) {
      query.categoryID = new ObjectId(category);
    }

    const populate = [
      {
        path: 'categoryID',
      },
      {
        path: 'interviewerID',
        model: 'User',
        select: 'name lastName email country image academic',
      },
      {
        path: 'moderatorID',
        model: 'User',
        select: 'name lastName email country image academic',
      },
      {
        path: 'interviewersIds',
        model: 'User',
        select: 'name lastName email country image academic',
      },
      {
        path: 'transmissionChannels',
        model: 'ChannelTransmission',
      },
    ];

    const webinars = await this.webinarModel
      .find(query)
      .populate(populate)
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .exec();

    const itemCount = await this.webinarModel.countDocuments(query).exec();
    const pageMetaDto = new PageMetaEntity({ itemCount, pageOptionsDto });

    return new PageEntity(webinars, pageMetaDto);
  }
}

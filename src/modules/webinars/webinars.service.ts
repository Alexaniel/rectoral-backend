import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageMetaEntity } from 'src/common/entities/meta.entity';
import { PageEntity } from 'src/common/entities/page.entity';
import { Webinar, WebinarDocument } from 'src/schemas/webinar.schema';
import { getWebinarsByMonth } from './utils/webinars.utils';

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

  async getCalendarWebinars() {
    const currentYear = new Date().getFullYear();
    const webinarsData = await this.webinarModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $year: '$date' }, currentYear],
          },
        },
      },
      {
        $lookup: {
          from: 'webinarcategories',
          localField: 'categoryID',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'channeltransmissions',
          localField: 'transmissionChannels',
          foreignField: '_id',
          as: 'transmissionChannels',
        },
      },
      {
        $project: {
          month: { $month: '$date' },
          day: { $dayOfMonth: '$date' },
          categoryID: 1,
          webinar: '$$ROOT',
        },
      },
      {
        $group: {
          _id: { month: '$month' },
          days: { $addToSet: '$day' },
          webinars: { $push: '$webinar' },
        },
      },
      {
        $group: {
          _id: { categoryID: '$webinar.categoryID', month: '$_id.month' },
          days: { $first: '$days' },
          webinars: { $first: '$webinars' },
        },
      },
      {
        $group: {
          _id: '$_id.month',
          months: {
            $push: {
              categoryID: '$_id.categoryID',
              days: '$days',
              webinars: '$webinars',
            },
          },
        },
      },
      {
        $project: {
          month: {
            $let: {
              vars: {
                monthsInString: [
                  '',
                  'JANUARY',
                  'FEBRUARY',
                  'MARCH',
                  'APRIL',
                  'MAY',
                  'JUNE',
                  'JULY',
                  'AUGUST',
                  'SEPTEMBER',
                  'OCTOBER',
                  'NOVEMBER',
                  'DECEMBER',
                ],
              },
              in: { $arrayElemAt: ['$$monthsInString', '$_id'] },
            },
          },
          months: 1,
        },
      },
    ]);

    const webinars = getWebinarsByMonth(webinarsData);

    return webinars;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getCountry } from 'src/common/utils/countries.utils';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class MetricsService {
  _options = {
    new: true,
    upsert: true,
    lean: true,
  };

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getMetrics() {
    const match = {
      $match: {
        role: {
          $in: ['SIGNATORY'],
        },
      },
    };

    const countries = await this.userModel.aggregate([
      match,
      { $group: { _id: '$country' } },
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);

    const totalUsers = await this.userModel.countDocuments(match.$match);

    const usersByCountry = await this.userModel.aggregate([
      match,
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const formatUsersByCountry = usersByCountry.map((country) => {
      const countryData = getCountry(country._id);
      return {
        name: countryData.name,
        _id: countryData.alpha3Code,
        nativeName: countryData.nativeName,
        flag: countryData.flag,
        count: country.count,
      };
    });

    const usersByGender = await this.userModel.aggregate([
      match,
      { $group: { _id: '$gender', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const usersByMembership = await this.userModel.aggregate([
      match,
      {
        $lookup: {
          from: 'memberships',
          localField: 'membership',
          foreignField: '_id',
          as: 'membership',
        },
      },
      {
        $unwind: '$membership',
      },
      {
        $group: {
          _id: '$membership.keyName',
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          usersByMembership: {
            $push: {
              k: '$_id',
              v: { count: '$count' },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          usersByMembership: { $arrayToObject: '$usersByMembership' },
        },
      },
    ]);

    const metrics = {
      countries: countries[0].count,
      totalUsers,
      usersByCountry: formatUsersByCountry,
      usersByGender,
      usersByMembership: usersByMembership[0].usersByMembership,
    };

    return metrics;
  }
}

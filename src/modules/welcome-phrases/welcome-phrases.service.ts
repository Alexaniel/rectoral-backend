import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageMetaEntity } from 'src/common/entities/meta.entity';
import { PageEntity } from 'src/common/entities/page.entity';
import { IWelcomePhrase } from 'src/common/interfaces/welcome-phrase.interfaces';
import { getCountry } from 'src/common/utils/countries.utils';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class WelcomePhrasesService {
  _options = {
    new: true,
    upsert: true,
    lean: true,
  };

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getWelcomePhrases(pageOptionsDto: PageOptionsDto) {
    const { limit, skip, search } = pageOptionsDto;
    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
      ];
    }

    const projection = {
      name: 1,
      lastName: 1,
      email: 1,
      country: 1,
      slogan: 1,
    };

    const users = await this.userModel.aggregate([
      { $sample: { size: limit } },
      { $match: query },
      { $project: projection },
      { $skip: skip },
      { $limit: limit },
    ]);

    const phrases = users.map((user: IWelcomePhrase) => {
      const { country } = user;
      const { flag, alpha3Code, nativeName } = getCountry(country);
      return { ...user, flag, countryCode: alpha3Code, country: nativeName };
    });

    const itemCount = await this.userModel.countDocuments(query).exec();
    const pageMetaDto = new PageMetaEntity({ itemCount, pageOptionsDto });

    return new PageEntity(phrases, pageMetaDto);
  }
}

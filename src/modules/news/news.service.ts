import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageMetaEntity } from 'src/common/entities/meta.entity';
import { PageEntity } from 'src/common/entities/page.entity';
import { News, NewsDocument } from 'src/schemas/news.schema';

@Injectable()
export class NewsService {
  _options = {
    new: true,
    upsert: true,
    lean: true,
  };

  constructor(
    @InjectModel(News.name)
    private readonly newsModel: Model<NewsDocument>,
  ) {}

  async getNews(pageOptionsDto: PageOptionsDto) {
    const { limit, skip, source } = pageOptionsDto;

    const query: any = {
      isAvailable: true,
    };

    if (source) {
      query.source = source;
    }

    const news = await this.newsModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 })
      .exec();

    const itemCount = await this.newsModel.countDocuments(query).exec();

    const pageMetaDto = new PageMetaEntity({ itemCount, pageOptionsDto });

    return new PageEntity(news, pageMetaDto);
  }
}

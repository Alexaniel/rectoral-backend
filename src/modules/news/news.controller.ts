import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getNews(@Query() query: PageOptionsDto) {
    const news = await this.newsService.getNews(query);

    return {
      message: 'News',
      ...news,
    };
  }
}

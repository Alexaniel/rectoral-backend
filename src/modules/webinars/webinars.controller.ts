import { Controller, Get, Query } from '@nestjs/common';
import { WebinarsService } from './webinars.service';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';

@Controller('webinars')
export class WebinarsController {
  constructor(private readonly webinarsService: WebinarsService) {}

  @Get()
  async getWebinars(@Query() query: PageOptionsDto) {
    const phrases = await this.webinarsService.getWebinars(query);
    return {
      message: 'Webinars',
      ...phrases,
    };
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { WebinarsService } from './webinars.service';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';

@Controller('webinars')
export class WebinarsController {
  constructor(private readonly webinarsService: WebinarsService) {}

  @Get()
  async getWebinars(@Query() query: PageOptionsDto) {
    const webinars = await this.webinarsService.getWebinars(query);
    return {
      message: 'Webinars',
      ...webinars,
    };
  }

  @Get('/calendar')
  async getCalendarWebinars() {
    const webinars = await this.webinarsService.getCalendarWebinars();
    return {
      message: 'Webinars',
      data: webinars,
    };
  }
}

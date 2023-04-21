import { Controller, Get, Query } from '@nestjs/common';
import { SupportersService } from './supporters.service';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';

@Controller('supporters')
export class SupportersController {
  constructor(private readonly supportersService: SupportersService) {}

  @Get()
  async getSupporters(@Query() query: PageOptionsDto) {
    const supporters = await this.supportersService.getSupporters(query);
    return {
      message: 'Supporters',
      ...supporters,
    };
  }
}

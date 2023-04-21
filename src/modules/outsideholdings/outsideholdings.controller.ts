import { Controller, Get, Query } from '@nestjs/common';
import { OutsideholdingsService } from './outsideholdings.service';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';

@Controller('outside-holdings')
export class OutsideholdingsController {
  constructor(
    private readonly outsideHoldingsService: OutsideholdingsService,
  ) {}

  @Get()
  async getOutsideHoldings(@Query() query: PageOptionsDto) {
    const outsideHoldings =
      await this.outsideHoldingsService.getOutsideHoldings(query);
    return {
      message: 'Outside Holdings',
      ...outsideHoldings,
    };
  }
}

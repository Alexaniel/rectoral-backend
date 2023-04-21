import { Controller, Get, Query } from '@nestjs/common';
import { WelcomePhrasesService } from './welcome-phrases.service';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';

@Controller('welcome-phrases')
export class WelcomePhrasesController {
  constructor(private readonly welcomePhrasesService: WelcomePhrasesService) {}

  @Get()
  async getWelcomePhrases(@Query() query: PageOptionsDto) {
    const phrases = await this.welcomePhrasesService.getWelcomePhrases(query);
    return {
      message: 'Welcome phrases',
      ...phrases,
    };
  }
}

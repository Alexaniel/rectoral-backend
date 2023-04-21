import { Test, TestingModule } from '@nestjs/testing';
import { WelcomePhrasesService } from './welcome-phrases.service';

describe('WelcomePhrasesService', () => {
  let service: WelcomePhrasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WelcomePhrasesService],
    }).compile();

    service = module.get<WelcomePhrasesService>(WelcomePhrasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

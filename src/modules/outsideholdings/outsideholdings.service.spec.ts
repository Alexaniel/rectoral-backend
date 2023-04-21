import { Test, TestingModule } from '@nestjs/testing';
import { OutsideholdingsService } from './outsideholdings.service';

describe('OutsideholdingsService', () => {
  let service: OutsideholdingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OutsideholdingsService],
    }).compile();

    service = module.get<OutsideholdingsService>(OutsideholdingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

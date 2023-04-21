import { Test, TestingModule } from '@nestjs/testing';
import { OutsideholdingsController } from './outsideholdings.controller';

describe('OutsideholdingsController', () => {
  let controller: OutsideholdingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutsideholdingsController],
    }).compile();

    controller = module.get<OutsideholdingsController>(OutsideholdingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { WelcomePhrasesController } from './welcome-phrases.controller';

describe('WelcomePhrasesController', () => {
  let controller: WelcomePhrasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WelcomePhrasesController],
    }).compile();

    controller = module.get<WelcomePhrasesController>(WelcomePhrasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

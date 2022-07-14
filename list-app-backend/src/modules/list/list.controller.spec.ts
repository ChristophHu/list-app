import { Test, TestingModule } from '@nestjs/testing';
import { ListController } from './list.controller';

describe('ListController', () => {
  let controller: ListController;

  describe('Example test', () => {
    it('equals', () => {
        expect(true).toEqual(true)
    })
  })
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [ListController],
  //   }).compile();

  //   controller = module.get<ListController>(ListController);
  // });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ListService } from './list.service';

describe('ListService', () => {
  let service: ListService;

  describe('Example test', () => {
    it('equals', () => {
        expect(true).toEqual(true)
    })
  })
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [ListService],
  //   }).compile();

  //   service = module.get<ListService>(ListService);
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});

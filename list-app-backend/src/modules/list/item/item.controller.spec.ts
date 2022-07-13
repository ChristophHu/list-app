import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

describe('CatsController', () => {
  let itemController: ItemController;
  let itemService: ItemService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [ItemController],
        providers: [ItemService],
      }).compile();

    itemService = moduleRef.get<ItemService>(ItemService);
    itemController = moduleRef.get<ItemController>(ItemController);
  })

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest.spyOn(itemService, 'findAll').mockImplementation(() => result);

      expect(await itemController.findAll()).toBe(result);
    });
  })

  // describe('findAll', () => {
  //   it('should return an array of cats', async () => {
  //     const result = ['test'];
  //     jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

  //     expect(await catsController.findAll()).toBe(result);
  //   });
  // });
})

// describe('ItemController', () => {
//   let controller: ItemController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ItemController],
//     }).compile();

//     controller = module.get<ItemController>(ItemController);
//   });

//   // it('should be defined', () => {
//   //   expect(controller).toBeDefined();
//   // });
// });

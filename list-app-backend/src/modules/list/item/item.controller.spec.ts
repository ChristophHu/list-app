import { Test, TestingModule } from '@nestjs/testing'
import { ItemController } from './item.controller'
import { ItemService } from './item.service'

describe('CatsController', () => {
  let controller: ItemController;
  let service: ItemService;

  describe('Example test', () => {
    it('equals', () => {
        expect(true).toEqual(true)
    })
  })

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [ItemController],
        providers: [ItemService],
      }).compile();

    controller = moduleRef.get<ItemController>(ItemController)
    service = moduleRef.get<ItemService>(ItemService)
  })

  it('controller should be defined', () => {
    expect(controller).toBeDefined()
  })
  it('service should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getItems', () => {
    it('should return all the events', async () => {
      const result = [
        { id: '100', id_list: '1', title: 'first title', description: 'first description', complete: false }
      ];
  
      const data = await service.getItems()
      expect(data).toEqual(result)
    })
  })
})
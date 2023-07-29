import { Test, TestingModule } from '@nestjs/testing';
import { RoomConfessionController } from './room-confession.controller';
import { RoomConfessionService } from './room-confession.service';

describe('RoomConfessionController', () => {
  let controller: RoomConfessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomConfessionController],
      providers: [RoomConfessionService],
    }).compile();

    controller = module.get<RoomConfessionController>(RoomConfessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

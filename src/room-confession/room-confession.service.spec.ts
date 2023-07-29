import { Test, TestingModule } from '@nestjs/testing';
import { RoomConfessionService } from './room-confession.service';

describe('RoomConfessionService', () => {
  let service: RoomConfessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomConfessionService],
    }).compile();

    service = module.get<RoomConfessionService>(RoomConfessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

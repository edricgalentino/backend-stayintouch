import { Module } from '@nestjs/common';
import { RoomConfessionService } from './room-confession.service';
import { RoomConfessionController } from './room-confession.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomConfession } from './entities/room-confession.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomConfession])],
  controllers: [RoomConfessionController],
  providers: [RoomConfessionService],
  exports: [RoomConfessionService],
})
export class RoomConfessionModule {}

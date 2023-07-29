import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomConfessionService } from './room-confession.service';
import {
  getAllRoomDto,
  CreateRoomConfessionDto,
  UpdateRoomConfessionDto,
} from './dto/room-confession.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('room-confession')
@ApiTags('room-confession')
export class RoomConfessionController {
  constructor(private readonly roomConfessionService: RoomConfessionService) {}

  @Get()
  async findAll(@Body() getAllRoomDto: getAllRoomDto) {
    return await this.roomConfessionService.findAll(getAllRoomDto);
  }

  @Get(':room_id')
  async findOne(@Param('room_id') room_id: string) {
    return await this.roomConfessionService.findOne(+room_id);
  }

  @Post()
  async createRoom(@Body() createRoomConfessionDto: CreateRoomConfessionDto) {
    return await this.roomConfessionService.createRoom(createRoomConfessionDto);
  }

  @Patch()
  async updateRoom(@Body() updateRoomConfessionDto: UpdateRoomConfessionDto) {
    return await this.roomConfessionService.updateRoom(updateRoomConfessionDto);
  }

  @Delete(':room_id')
  async deleteRoom(@Param('room_id') room_id: string) {
    return await this.roomConfessionService.deleteRoom(+room_id);
  }
}

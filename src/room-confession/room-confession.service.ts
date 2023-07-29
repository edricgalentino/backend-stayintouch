import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomConfession } from './entities/room-confession.entity';
import { Repository } from 'typeorm';
import {
  getAllRoomDto,
  CreateRoomConfessionDto,
  UpdateRoomConfessionDto,
} from './dto/room-confession.dto';

@Injectable()
export class RoomConfessionService {
  constructor(
    @InjectRepository(RoomConfession)
    private roomConfessionRepository: Repository<RoomConfession>,
  ) {}

  async findAll(getAllRoomDto: getAllRoomDto) {
    const { user_id, page_number, limit, search, search_by, sort } =
      getAllRoomDto;
    const skip = (page_number - 1) * limit;
    const take = limit;
    const order = { created_at: sort };
    const where = { [search_by]: search, user_id };
    const relations = ['created_by', 'confession'];

    const [result, total] = await this.roomConfessionRepository.findAndCount({
      where,
      order,
      skip,
      take,
      relations,
    });
    return { meta: { page_number, limit, total }, data: result };
  }

  async findOne(room_id: number) {
    const relations = ['created_by', 'confession'];
    const room = await this.roomConfessionRepository.findOne({
      where: { id: room_id },
      relations,
    });

    if (!room) throw new Error('Room not found');

    return room;
  }

  async createRoom(createRoomConfessionDto: CreateRoomConfessionDto) {
    const room = this.roomConfessionRepository.create({
      ...createRoomConfessionDto,
      created_at: new Date(),
      updated_at: new Date(),
    });
    try {
      await this.roomConfessionRepository.save(room);
    } catch (error) {
      throw new Error(error);
    }
    return room;
  }

  async updateRoom(updateRoomConfessionDto: UpdateRoomConfessionDto) {
    const room = await this.roomConfessionRepository.findOneBy({
      id: updateRoomConfessionDto.id,
    });

    if (!room) throw new Error('Room not found');

    // room.title = updateRoomConfessionDto.title;
    // room.description = updateRoomConfessionDto.description;
    // room.updated_at = new Date();

    try {
      await this.roomConfessionRepository.update(
        {
          id: updateRoomConfessionDto.id,
        },
        {
          ...updateRoomConfessionDto,
          updated_at: new Date(),
        },
      );
    } catch (error) {
      throw new Error(error);
    }

    return room;
  }

  async deleteRoom(room_id: number) {
    const room = await this.roomConfessionRepository.findOneBy({ id: room_id });

    if (!room) throw new Error('Room not found');

    try {
      await this.roomConfessionRepository.delete({ id: room_id });
    } catch (error) {
      throw new Error(error);
    }

    return room;
  }
}

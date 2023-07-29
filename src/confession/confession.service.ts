import { Injectable } from '@nestjs/common';
import {
  CreateConfessionDto,
  UpdateConfessionDto,
  getAllConfessionDto,
  likeConfessionDto,
} from './dto/confession.dto';
import { Confession } from './entities/confession.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConfessionService {
  constructor(
    @InjectRepository(Confession)
    private confessionRepository: Repository<Confession>,
  ) {}

  async findAll(getAllConfessionDto: getAllConfessionDto) {
    const { page_number, limit, search, search_by, sort, user_id } =
      getAllConfessionDto;
    const skip = (page_number - 1) * limit;
    const take = limit;
    const order = { created_at: sort };
    const where = { [search_by]: search, user_id };
    const relations = ['created_by'];

    const [result, total] = await this.confessionRepository.findAndCount({
      where,
      order,
      skip,
      take,
      relations,
    });
    return { meta: { page_number, limit, total }, data: result };
  }

  async findOne(id: number) {
    const confession = await this.confessionRepository.findOneBy({ id });

    if (!confession) throw new Error('Confession not found');
    confession.seen += 1;

    try {
      await this.confessionRepository.save(confession);
    } catch (error) {
      throw new Error(error);
    }

    return confession;
  }

  async create(createConfessionDto: CreateConfessionDto) {
    const confession = this.confessionRepository.create({
      ...createConfessionDto,
      room_confession_id:
        createConfessionDto.created_from === 'room'
          ? createConfessionDto.room_confession_id
          : null,
      updated_by: createConfessionDto.name,
      created_at: new Date(),
      updated_at: new Date(),
    });
    try {
      await this.confessionRepository.save(confession);
    } catch (error) {
      throw new Error(error);
    }

    return confession;
  }

  async likes(likeConfessionDto: likeConfessionDto) {
    const { id, is_liked } = likeConfessionDto;
    // add 1 to likes field in confession table where id = id if is_liked = true else -1
    const confession = await this.confessionRepository.findOneBy({ id });
    if (!confession) throw new Error('Confession not found');
    confession.likes += is_liked ? 1 : -1;

    try {
      await this.confessionRepository.save(confession);
    } catch (error) {
      throw new Error(error);
    }

    return {
      message: `Confession ${is_liked ? 'liked' : 'unliked'} successfully`,
    };
  }

  async update(id: number, updateConfessionDto: UpdateConfessionDto) {
    // update confession where id = id

    // const confession = await this.confessionRepository.findOneBy({ id });
    // confession.updated_at = new Date();
    // confession.updated_by = updateConfessionDto.name;
    // confession.to = updateConfessionDto.to;
    // confession.tags = updateConfessionDto.tags;
    // confession.category = updateConfessionDto.category;
    // confession.message = updateConfessionDto.message;
    // confession.excerpt = updateConfessionDto.excerpt;
    // await this.confessionRepository.save(confession);
    try {
      await this.confessionRepository.update(
        { id },
        {
          ...updateConfessionDto,
          updated_at: new Date(),
          updated_by: updateConfessionDto.name,
        },
      );
    } catch (error) {
      throw new Error(error);
    }

    return { message: 'Confession updated successfully' };
  }

  async delete(id: number) {
    // delete confession where id = id
    const confession = await this.confessionRepository.findOneBy({ id });
    if (!confession) throw new Error('Confession not found');

    try {
      await this.confessionRepository.delete({ id });
    } catch (error) {
      throw new Error(error);
    }

    return { message: 'Confession deleted successfully' };
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConfessionService } from './confession.service';
import {
  CreateConfessionDto,
  UpdateConfessionDto,
  getAllConfessionDto,
  likeConfessionDto,
} from './dto/confession.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('confession')
@ApiTags('confession')
export class ConfessionController {
  constructor(private readonly confessionService: ConfessionService) {}

  @Get('all')
  async findAll(@Body() getAllConfessionDto: getAllConfessionDto) {
    return await this.confessionService.findAll(getAllConfessionDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.confessionService.findOne(+id);
  }

  @Post('create')
  async create(@Body() createConfessionDto: CreateConfessionDto) {
    return await this.confessionService.create(createConfessionDto);
  }

  @Post('likes')
  async likes(@Body() likeConfessionDto: likeConfessionDto) {
    return await this.confessionService.likes(likeConfessionDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateConfessionDto: UpdateConfessionDto,
  ) {
    return await this.confessionService.update(+id, updateConfessionDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.confessionService.delete(+id);
  }
}

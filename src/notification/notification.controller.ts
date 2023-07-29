import { Controller, Get, Body, Patch, Param, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import {
  getAllNotificationDto,
  createNotificationDto,
} from './dto/notification.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('notification')
@ApiTags('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('all')
  async findAllByUser(@Body() getAllNotificationDto: getAllNotificationDto) {
    return await this.notificationService.findAll(getAllNotificationDto);
  }

  @Post('create')
  async create(@Body() createNotificationDto: createNotificationDto) {
    return await this.notificationService.create(createNotificationDto);
  }

  @Patch(':notification_id')
  async markAsRead(@Param('notification_id') notification_id: string) {
    return await this.notificationService.markAsRead(+notification_id);
  }

  @Patch('mark-all-as-read/:user_id')
  async markAllAsRead(@Param('user_id') user_id: string) {
    return await this.notificationService.markAllAsRead(+user_id);
  }
}

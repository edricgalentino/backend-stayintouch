import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import {
  getAllNotificationDto,
  createNotificationDto,
} from './dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async findAll(getAllNotificationDto: getAllNotificationDto) {
    const { page_number, limit, user_id } = getAllNotificationDto;
    const skip = (page_number - 1) * limit;
    const take = limit;
    const where = { user_id, is_read: false };
    const relations = ['created_by'];

    const [result, total] = await this.notificationRepository.findAndCount({
      where,
      skip,
      order: { created_at: 'DESC' },
      take,
      relations,
    });
    return { meta: { page_number, limit, total }, data: result };
  }

  async create(createNotificationDto: createNotificationDto) {
    const confession = this.notificationRepository.create({
      ...createNotificationDto,
      created_at: new Date(),
      updated_at: new Date(),
    });
    try {
      await this.notificationRepository.save(confession);
    } catch (error) {
      throw new Error(error);
    }
    return confession;
  }

  async markAsRead(notification_id: number) {
    const notification = await this.notificationRepository.findOneBy({
      id: notification_id,
    });

    if (!notification) throw new Error('Notification not found');
    notification.is_read = true;

    try {
      await this.notificationRepository.save(notification);
    } catch (error) {
      throw new Error(error);
    }

    return notification;
  }

  async markAllAsRead(user_id: number) {
    const usersAllNotification = await this.notificationRepository.find({
      where: { user_id },
    });

    if (!usersAllNotification)
      throw new Error('There is no notification for this user');
    usersAllNotification.forEach((item) => {
      item.is_read = true;
    });

    try {
      await this.notificationRepository.save(usersAllNotification);
    } catch (error) {
      throw new Error(error);
    }

    return usersAllNotification;
  }
}

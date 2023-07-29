export class createNotificationDto {
  title: string;
  message: string;
  category: 'comment' | 'likes' | 'reminder';
  user_id: number;
}

export class getAllNotificationDto {
  page_number: number;
  limit: number;
  user_id: number;
}

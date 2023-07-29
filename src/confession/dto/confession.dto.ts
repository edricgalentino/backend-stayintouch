import { PartialType } from '@nestjs/swagger';

export class CreateConfessionDto {
  name: string;
  to: string;
  tags: string[];
  category: string;
  excerpt: string;
  message: string;
  seen: number;
  likes: number;
  replies: object[];
  created_from: 'public' | 'room';
  room_confession_id?: number;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
}

export class UpdateConfessionDto extends PartialType(CreateConfessionDto) {
  name: string;
  to: string;
  tags: string[];
  category: string;
  message: string;
}

export class getAllConfessionDto {
  user_id?: number;
  page_number: number;
  limit: number;
  search: string;
  search_by: 'name' | 'category' | 'tags' | 'to';
  sort: 'ASC' | 'DESC';
}

export class likeConfessionDto {
  id: number;
  is_liked: boolean;
}

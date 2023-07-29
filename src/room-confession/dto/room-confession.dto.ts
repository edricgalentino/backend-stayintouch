import { PartialType } from '@nestjs/swagger';

export type getAllRoomDto = {
  user_id?: number;
  page_number: number;
  limit: number;
  search: string;
  search_by: 'title';
  sort: 'ASC' | 'DESC';
};

export type CreateRoomConfessionDto = {
  user_id: number;
  title: string;
  description: string;
};

export type UpdateRoomConfessionDto = {
  id: number;
  user_id: number;
  title: string;
  description: string;
};

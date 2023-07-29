import { RoomConfession } from 'src/room-confession/entities/room-confession.entity';
import { Users } from 'src/users/entity/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'confession' })
export class Confession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  user_id: number;

  @Column({ type: 'int', nullable: false })
  room_confession_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  to: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  tags: string[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  category: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  excerpt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  message: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  seen: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  likes: number;

  @Column({ type: 'json', nullable: true })
  replies: object[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  updated_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  // relations
  @ManyToOne(() => Users, (users: Users) => users.confession)
  created_by: Users;

  @ManyToOne(
    () => RoomConfession,
    (roomConfession: RoomConfession) => roomConfession.id,
  )
  roomConfession: RoomConfession;
}

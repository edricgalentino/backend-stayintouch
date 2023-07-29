import { Confession } from 'src/confession/entities/confession.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_login: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ default: false })
  is_admin: boolean;

  // relations
  @OneToMany(
    () => Confession,
    (confession: Confession) => confession.created_by,
  )
  confession: Confession[];

  // @OneToOne(
  //   () => RoomConfession,
  //   (roomConfession: RoomConfession) => roomConfession.created_by,
  // )
  // roomConfession: RoomConfession;

  @OneToMany(
    () => Notification,
    (notification: Notification) => notification.created_by,
  )
  notifications: Notification[];
}

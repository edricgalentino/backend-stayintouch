import { Module } from '@nestjs/common';
import { ConfessionService } from './confession.service';
import { ConfessionController } from './confession.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Confession } from './entities/confession.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Confession])],
  controllers: [ConfessionController],
  providers: [ConfessionService],
  exports: [ConfessionService],
})
export class ConfessionModule {}

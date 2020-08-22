import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { UsersService } from './users.service';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService, UsersService]
})
export class RoomsModule {}

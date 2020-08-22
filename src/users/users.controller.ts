import { Controller } from '@nestjs/common';

@Controller('users')
export class UsersController {}

export interface User {
  userName: string;
  userId: number;
  currentRoom: number;
}

export interface Users {
  [userId: number]: User;
}

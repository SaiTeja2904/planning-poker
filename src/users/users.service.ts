import { Injectable } from '@nestjs/common';
import { Users, User } from './users.controller';

@Injectable()
export class UsersService {
  users: Users = {};

  addUser({ userDetails, currentRoom }) {
    const { userId } = userDetails;
    this.users[userId] = { ...userDetails, currentRoom };
  }

  getAllUsers() {
    return this.users;
  }

  getAllUsersByRoomId(roomId) {
    const currentRoomUsers = {};
    return Object.values(this.getAllUsers()).reduce((acc, curr) => {
      if (curr.currentRoom === +roomId) {
        acc[curr.userId] = curr;
      }
      return acc;
    }, currentRoomUsers);
  }
}

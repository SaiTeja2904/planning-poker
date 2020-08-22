import { Injectable } from '@nestjs/common';

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

export interface User {
  userName: string;
  userId: number;
  currentRoom: number;
}

export interface Users {
  [userId: number]: User;
}

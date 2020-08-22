import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Rooms } from './rooms.controller';

@Injectable()
export class RoomsService {
  rooms: Rooms = {};
  constructor(public userService: UsersService) {}

  createRoom(userDetails) {
    // console.log(userDetails);
    const { userId } = userDetails;
    let roomId = Math.floor(Math.random() * Math.pow(10, 6));
    while (this.rooms[roomId]) {
      roomId = Math.floor(Math.random() * Math.pow(10, 6));
    }
    this.rooms[roomId] = {
      owner: userId,
      users: {
        [userId]: {
          storyPoints: 0,
          castedVote: false,
        },
      },
      story: {
        storyId: '',
        storyDescription: '',
      },
      flipCards: false,
    };
    this.userService.addUser({ userDetails, currentRoom: roomId });
    return roomId;
  }

  joinRoom(userDetails, roomId) {
    // console.log(userDetails);
    const { userId } = userDetails;
    if (!this.rooms[roomId]) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Room Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const room = this.rooms[roomId];
    room.users[userId] = {
      storyPoints: 0,
      castedVote: false,
    };
    this.userService.addUser({ userDetails, currentRoom: roomId });
    return roomId;
  }

  getRoomStatus(roomId) {
    console.log(this.userService.getAllUsers());
    if (!this.rooms[roomId]) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Room Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const room = this.rooms[roomId];
    const currentRoomUsers = this.userService.getAllUsersByRoomId(roomId);
    const { owner, users, flipCards } = room;
    if (flipCards) {
      return {
        owner: currentRoomUsers[owner].userName,
        users: Object.keys(users).reduce((acc, curr) => {
          acc.push({
            ...users[curr],
            userName: currentRoomUsers[curr].userName,
          });
          return acc;
        }, []),
        flipCards,
      };
    } else {
      return {
        owner: currentRoomUsers[owner].userName,
        users: Object.keys(users).reduce((acc, curr) => {
          acc.push({
            ...users[curr],
            storyPoints: 0,
            userName: currentRoomUsers[curr].userName,
          });
          return acc;
        }, []),
        flipCards,
      };
    }
  }

  flipCards(roomId) {
    if (!this.rooms[roomId]) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Room Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const room = this.rooms[roomId];
    room.flipCards = true;
    return roomId;
  }
}

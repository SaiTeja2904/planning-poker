import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/rooms/users.service';
import { Rooms } from './rooms.controller';

@Injectable()
export class RoomsService {
  rooms: Rooms = {};
  constructor(public userService: UsersService) {}

  createRoom(userDetails) {
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
    const { userId } = userDetails;
    if (!this.rooms[roomId]) {
      this.roomNotFoundError();
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
    if (!this.rooms[roomId]) {
      this.roomNotFoundError();
    }
    const room = this.rooms[roomId];
    const currentRoomUsers = this.userService.getAllUsersByRoomId(roomId);
    const { owner, users, flipCards, story } = room;
    let usersData;
    if (flipCards) {
      usersData = Object.keys(users).reduce((acc, curr) => {
        acc.push({
          ...users[curr],
          userName: currentRoomUsers[curr].userName,
        });
        return acc;
      }, []);
    } else {
      usersData = Object.keys(users).reduce((acc, curr) => {
        acc.push({
          ...users[curr],
          storyPoints: 0,
          userName: currentRoomUsers[curr].userName,
        });
        return acc;
      }, []);
    }
    return {
      owner: currentRoomUsers[owner].userName,
      users: usersData,
      story,
      flipCards,
    };
  }

  flipCards(roomId) {
    if (!this.rooms[roomId]) {
      this.roomNotFoundError();
    }
    const room = this.rooms[roomId];
    room.flipCards = true;
    return {
      status: 'Success',
    };
  }

  castVote({ userId, roomId, storyPoints }) {
    if (!this.rooms[roomId]) {
      this.roomNotFoundError();
    }
    const room = this.rooms[roomId];
    if (!room.users[+userId]) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const user = room.users[userId];
    user.storyPoints = storyPoints;
    user.castedVote = true;
    return {
      status: 'Success',
    };
  }

  resetStory(roomId) {
    if (!this.rooms[roomId]) {
      this.roomNotFoundError();
    }

    let { flipCards, story, users } = this.rooms[roomId];
    flipCards = false;
    story = {
      storyDescription: '',
      storyId: '',
    };
    Object.keys(users).forEach(userId => {
      users[userId] = { storyPoints: 0, castedVote: false };
    });
    return {
      status: 'Success',
    };
  }

  setStroryDetails(storyDetails, roomId) {
    if (!this.rooms[roomId]) {
      this.roomNotFoundError();
    }
    const room = this.rooms[roomId];
    room.story = storyDetails;
    return {
      status: 'Success',
    };
  }

  roomNotFoundError() {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Room Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

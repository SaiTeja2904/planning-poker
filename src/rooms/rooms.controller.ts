import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(public roomsService: RoomsService) {}

  @Post('createRoom')
  createRoom(@Body() { userDetails }) {
    return this.roomsService.createRoom(userDetails);
  }

  @Post('joinRoom')
  joinRoom(@Body() { userDetails, roomId }) {
    return this.roomsService.joinRoom(userDetails, roomId);
  }

  @Get('status/:roomId')
  getRoomStatus(@Param('roomId') roomId: number) {
    return this.roomsService.getRoomStatus(roomId);
  }

  @Put('flipCards/:roomId')
  flipCards(@Param('roomId') roomId: number) {
    return this.roomsService.flipCards(roomId);
  }

  @Post('castVote')
  castVote(@Body() { userId, roomId, storyPoints }) {
    return this.roomsService.castVote({ userId, roomId, storyPoints });
  }

  @Put('resetStory/:roomId')
  resetStory(@Param('roomId') roomId: number) {
    return this.roomsService.resetStory(roomId);
  }

  @Post('setStoryDetails')
  setStroryDetails(@Body() { storyDetails, roomId }) {
    return this.roomsService.setStoryDetails(storyDetails, roomId);
  }
}

export interface Room {
  owner: number;
  users: any;
  story: {
    storyId: string;
    storyDescription: string;
  };
  flipCards: boolean;
}

export interface Rooms {
  [roomId: string]: Room;
}

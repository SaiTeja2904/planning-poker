import { UsersService } from 'src/rooms/users.service';
import { Rooms } from './rooms.controller';
export declare class RoomsService {
    userService: UsersService;
    rooms: Rooms;
    constructor(userService: UsersService);
    createRoom(userDetails: any): {
        userDetails: any;
        roomId: number;
        isOwner: boolean;
    };
    joinRoom(userDetails: any, roomId: any): {
        userDetails: any;
        roomId: any;
        isOwner: boolean;
    };
    getRoomStatus(roomId: any): {
        owner: any;
        users: any;
        story: {
            storyId: string;
            storyDescription: string;
        };
        flipCards: boolean;
    };
    flipCards(roomId: any): {
        status: string;
    };
    castVote({ userId, roomId, storyPoints }: {
        userId: any;
        roomId: any;
        storyPoints: any;
    }): {
        status: string;
    };
    resetStory(roomId: any): {
        status: string;
    };
    setStoryDetails(storyDetails: any, roomId: any): {
        status: string;
    };
    roomNotFoundError(): void;
}

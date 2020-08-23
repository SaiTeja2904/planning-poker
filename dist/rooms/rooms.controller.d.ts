import { RoomsService } from './rooms.service';
export declare class RoomsController {
    roomsService: RoomsService;
    constructor(roomsService: RoomsService);
    createRoom({ userDetails }: {
        userDetails: any;
    }): {
        userDetails: any;
        roomId: number;
        isOwner: boolean;
    };
    joinRoom({ userDetails, roomId }: {
        userDetails: any;
        roomId: any;
    }): {
        userDetails: any;
        roomId: any;
        isOwner: boolean;
    };
    getRoomStatus(roomId: number): {
        owner: any;
        users: any;
        story: {
            storyId: string;
            storyDescription: string;
        };
        flipCards: boolean;
    };
    flipCards(roomId: number): {
        status: string;
    };
    castVote({ userId, roomId, storyPoints }: {
        userId: any;
        roomId: any;
        storyPoints: any;
    }): {
        status: string;
    };
    resetStory(roomId: number): {
        status: string;
    };
    setStroryDetails({ storyDetails, roomId }: {
        storyDetails: any;
        roomId: any;
    }): {
        status: string;
    };
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

export declare class UsersService {
    users: Users;
    addUser({ userDetails, currentRoom }: {
        userDetails: any;
        currentRoom: any;
    }): void;
    getAllUsers(): Users;
    getAllUsersByRoomId(roomId: any): any;
}
export interface User {
    userName: string;
    userId: string;
    currentRoom: number;
}
export interface Users {
    [userId: number]: User;
}

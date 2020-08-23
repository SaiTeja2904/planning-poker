"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
let RoomsService = class RoomsService {
    constructor(userService) {
        this.userService = userService;
        this.rooms = {};
    }
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
        return { userDetails, roomId, isOwner: true };
    }
    joinRoom(userDetails, roomId) {
        if (!this.rooms[roomId]) {
            this.roomNotFoundError();
        }
        const { userId } = userDetails;
        const room = this.rooms[roomId];
        room.users[userId] = {
            storyPoints: 0,
            castedVote: false,
        };
        this.userService.addUser({ userDetails, currentRoom: roomId });
        return { userDetails, roomId, isOwner: room.owner === userId };
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
                acc.push(Object.assign(Object.assign({}, users[curr]), { userName: currentRoomUsers[curr].userName }));
                return acc;
            }, []);
        }
        else {
            usersData = Object.keys(users).reduce((acc, curr) => {
                acc.push(Object.assign(Object.assign({}, users[curr]), { storyPoints: 0, userName: currentRoomUsers[curr].userName }));
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
        if (!room.users[userId]) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'User Not Found',
            }, common_1.HttpStatus.NOT_FOUND);
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
        let { users } = this.rooms[roomId];
        this.rooms[roomId].flipCards = false;
        this.rooms[roomId].story = {
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
    setStoryDetails(storyDetails, roomId) {
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
        throw new common_1.HttpException({
            status: common_1.HttpStatus.NOT_FOUND,
            error: 'Room Not Found',
        }, common_1.HttpStatus.NOT_FOUND);
    }
};
RoomsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], RoomsService);
exports.RoomsService = RoomsService;
//# sourceMappingURL=rooms.service.js.map
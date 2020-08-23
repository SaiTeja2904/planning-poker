"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor() {
        this.users = {};
    }
    addUser({ userDetails, currentRoom }) {
        const { userId } = userDetails;
        this.users[userId] = Object.assign(Object.assign({}, userDetails), { currentRoom });
    }
    getAllUsers() {
        return this.users;
    }
    getAllUsersByRoomId(roomId) {
        const currentRoomUsers = {};
        return Object.values(this.getAllUsers()).reduce((acc, curr) => {
            if (+curr.currentRoom === +roomId) {
                acc[curr.userId] = curr;
            }
            return acc;
        }, currentRoomUsers);
    }
};
UsersService = __decorate([
    common_1.Injectable()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
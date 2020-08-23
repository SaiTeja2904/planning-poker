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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsController = void 0;
const common_1 = require("@nestjs/common");
const rooms_service_1 = require("./rooms.service");
let RoomsController = class RoomsController {
    constructor(roomsService) {
        this.roomsService = roomsService;
    }
    createRoom({ userDetails }) {
        return this.roomsService.createRoom(userDetails);
    }
    joinRoom({ userDetails, roomId }) {
        return this.roomsService.joinRoom(userDetails, roomId);
    }
    getRoomStatus(roomId) {
        return this.roomsService.getRoomStatus(roomId);
    }
    flipCards(roomId) {
        return this.roomsService.flipCards(roomId);
    }
    castVote({ userId, roomId, storyPoints }) {
        return this.roomsService.castVote({ userId, roomId, storyPoints });
    }
    resetStory(roomId) {
        return this.roomsService.resetStory(roomId);
    }
    setStroryDetails({ storyDetails, roomId }) {
        return this.roomsService.setStoryDetails(storyDetails, roomId);
    }
};
__decorate([
    common_1.Post('createRoom'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "createRoom", null);
__decorate([
    common_1.Post('joinRoom'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "joinRoom", null);
__decorate([
    common_1.Get('status/:roomId'),
    __param(0, common_1.Param('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "getRoomStatus", null);
__decorate([
    common_1.Put('flipCards/:roomId'),
    __param(0, common_1.Param('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "flipCards", null);
__decorate([
    common_1.Post('castVote'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "castVote", null);
__decorate([
    common_1.Put('resetStory/:roomId'),
    __param(0, common_1.Param('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "resetStory", null);
__decorate([
    common_1.Post('setStoryDetails'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "setStroryDetails", null);
RoomsController = __decorate([
    common_1.Controller('rooms'),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService])
], RoomsController);
exports.RoomsController = RoomsController;
//# sourceMappingURL=rooms.controller.js.map
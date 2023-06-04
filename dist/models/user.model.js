"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserCreateAPI = exports.User = void 0;
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
const mongoose_1 = require("mongoose");
class User {
}
exports.User = User;
class UserCreateAPI {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_2.MaxLength)(12),
    (0, class_validator_2.MinLength)(2)
], UserCreateAPI.prototype, "nickName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)()
], UserCreateAPI.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Max)(90),
    (0, class_validator_1.Min)(1)
], UserCreateAPI.prototype, "time", void 0);
exports.UserCreateAPI = UserCreateAPI;
const UserSchema = new mongoose_1.Schema({
    _id: { type: String, required: false },
    nickName: { type: String, required: true },
    score: { type: Number, required: true },
    position: { type: Number, required: false },
}, { collection: 'user', timestamps: true });
exports.UserModel = (0, mongoose_1.model)('user', UserSchema);

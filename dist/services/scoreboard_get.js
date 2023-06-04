"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreboardGET = void 0;
const user_model_1 = require("../models/user.model");
function scoreboardGET(page) {
    return __awaiter(this, void 0, void 0, function* () {
        const collectionExists = yield user_model_1.UserModel.exists({});
        if (!collectionExists) {
            return { status: 'ok', content: { users: [], totalPages: 0, currentPage: 0 } };
        }
        const limit = 10;
        const totalUsersCount = yield user_model_1.UserModel.countDocuments();
        const totalPages = Math.ceil(totalUsersCount / limit);
        const skip = (page - 1) * limit;
        if (page > totalPages) {
            return { status: 'ko', content: 'Page not Found' };
        }
        try {
            const users = yield user_model_1.UserModel.find({}, 'nickName _id score').sort({ score: -1 }).skip(skip).limit(limit);
            return { status: 'ok', content: { users, totalPages, currentPage: page } };
        }
        catch (error) {
            return { status: 'ko', content: error };
        }
    });
}
exports.scoreboardGET = scoreboardGET;

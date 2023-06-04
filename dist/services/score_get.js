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
exports.scoreGET = void 0;
const user_model_1 = require("../models/user.model");
function scoreGET(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.UserModel.findById(userID).select('nickName _id score');
            const users = yield user_model_1.UserModel.find().sort({ score: -1 });
            const userIndex = (userID) => users.findIndex((u) => u._id === userID);
            if (!user) {
                return { status: 'ko', content: 'User not Found' };
            }
            user.position = userIndex(user._id) + 1;
            const [prevUsers, nextUsers] = yield Promise.all([
                user_model_1.UserModel.aggregate([
                    { $match: { score: { $lte: user === null || user === void 0 ? void 0 : user.score }, _id: { $ne: user === null || user === void 0 ? void 0 : user._id } } },
                    { $sort: { score: -1 } },
                    { $limit: 3 },
                ]),
                user_model_1.UserModel.aggregate([
                    { $match: { score: { $gt: user === null || user === void 0 ? void 0 : user.score }, _id: { $ne: user === null || user === void 0 ? void 0 : user._id } } },
                    { $sort: { score: 1 } },
                    { $limit: 3 },
                ]),
            ]);
            const userData = {
                user,
                prevUsers: prevUsers.map((el) => {
                    return Object.assign(Object.assign({}, el), { position: userIndex(el._id) + 1 });
                }),
                nextUsers: nextUsers.map((el) => {
                    return Object.assign(Object.assign({}, el), { position: userIndex(el._id) + 1 });
                }),
            };
            return { status: 'ok', content: userData };
        }
        catch (error) {
            return { status: 'ko', content: error };
        }
    });
}
exports.scoreGET = scoreGET;

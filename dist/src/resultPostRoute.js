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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const user_model_1 = require("../models/user.model");
const class_validator_1 = require("class-validator");
const error_exception_1 = require("../error-handler/error-exception");
const error_code_1 = require("../error-handler/error-code");
const result_post_1 = require("../services/result_post");
const calc_score_1 = require("../services/calc_score");
const router = express_1.default.Router();
const jsonParser = body_parser_1.default.json();
router.post('/end', jsonParser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const userNew = new user_model_1.UserCreateAPI();
    userNew.nickName = body.nickName;
    userNew._id = body._id;
    userNew.time = body.time;
    const userCreate = {
        nickName: userNew.nickName,
        _id: (userNew === null || userNew === void 0 ? void 0 : userNew._id) ? userNew._id : Math.round(Math.random() * 99999).toString(),
        score: (0, calc_score_1.calculateScore)(userNew.time),
        time: userNew === null || userNew === void 0 ? void 0 : userNew.time,
    };
    const errors = yield (0, class_validator_1.validate)(userNew);
    if (errors.length) {
        next(new error_exception_1.ErrorException(error_code_1.ErrorCode.ValidationError, errors));
    }
    else {
        const response = yield (0, result_post_1.resultPOST)(userCreate);
        if (response.status === 'ok') {
            res.send(response.content);
        }
        else {
            next(new error_exception_1.ErrorException(error_code_1.ErrorCode.UnknownError, response.content));
        }
    }
}));
exports.default = router;

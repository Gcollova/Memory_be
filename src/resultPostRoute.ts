import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import { UserCreate, UserCreateAPI, UserModel } from '../models/user.model';
import { validate } from 'class-validator';
import { ErrorException } from '../error-handler/error-exception';
import { ErrorCode } from '../error-handler/error-code';
import { resultPOST } from '../services/result_post';
import { calculateScore } from '../services/calc_score';

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/end', jsonParser, async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  const userNew = new UserCreateAPI();
  userNew.nickName = body.nickName;
  userNew._id = body._id;
  userNew.time = body.time;

  const userCreate: UserCreate = {
    nickName: userNew.nickName,
    _id: userNew?._id ? userNew._id : Math.round(Math.random() * 99999).toString(),
    score: calculateScore(userNew.time!),
    time: userNew?.time,
  };

  const errors = await validate(userNew);
  if (errors.length) {
    next(new ErrorException(ErrorCode.ValidationError, errors));
  } else {
    const response = await resultPOST(userCreate);
    if (response.status === 'ok') {
      res.send(response.content);
    } else {
      next(new ErrorException(ErrorCode.UnknownError, response.content));
    }
  }
});

export default router;

import express, { NextFunction, Request, Response } from 'express';
import { ErrorException } from '../error-handler/error-exception';
import { ErrorCode } from '../error-handler/error-code';
import { scoreboardGET } from '../services/scoreboard_get';

const router = express.Router();

router.get('/scoreboard', async (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;

  const response = await scoreboardGET(page);
  if (response.status === 'ok') {
    res.send(response.content);
  } else {
    next(new ErrorException(ErrorCode.UnknownError, response.content));
  }
});

export default router;

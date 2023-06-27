import { Router } from 'express';
import { usersController } from '../controllers/usersController';

const usersRouter = Router();

usersRouter.use('/users', usersController);

export default usersRouter;

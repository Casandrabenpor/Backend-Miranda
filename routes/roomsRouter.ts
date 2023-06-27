import { Router } from 'express';
import { roomsController } from '../controllers/roomsController';

const roomsRouter = Router();

roomsRouter.use('/rooms', roomsController);

export default roomsRouter;

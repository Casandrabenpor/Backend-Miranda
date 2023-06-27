import { Router } from 'express';
import { bookingsController } from '../controllers/bookingsController';

const bookingsRouter = Router();

bookingsRouter.use('/bookings', bookingsController);

export default bookingsRouter;

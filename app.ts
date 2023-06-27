import express, { Request, Response } from 'express';
import { usersController } from './controllers/usersController';
import { bookingsController } from './controllers/bookingsController';
import { roomsController } from './controllers/roomsController';
import { verifyTokenMiddleware } from './middleware/auth';
import { contactController } from './controllers/contactController';

const app = express();
const PORT = 3000;

app.get('/', function (req: Request, res: Response) {
  res.send('hello');
});

app.use('/users', verifyTokenMiddleware, usersController);
app.use('/bookings', verifyTokenMiddleware, bookingsController);
app.use('/rooms', verifyTokenMiddleware, roomsController);
app.use('/contact', verifyTokenMiddleware, contactController);

app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});

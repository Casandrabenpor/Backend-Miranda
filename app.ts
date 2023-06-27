import express, { Request, Response } from 'express';
import { usersController } from './controllers/usersController';
import { bookingsController } from './controllers/bookingsController';
import { roomsController } from './controllers/roomsController';
import { verifyTokenMiddleware } from './middleware/auth';
import { contactController } from './controllers/contactController';
import { authenticationController } from './controllers/authController';
require('dotenv').config();

const app = express();
const PORT = 3000;

app.get('/', function (req: Request, res: Response) {
  res.send('hello');
});

//public routes
app.use('/login', authenticationController);
// app.use("/info", infoRouter);

app.use('/users', verifyTokenMiddleware, usersController);
app.use('/bookings', verifyTokenMiddleware, bookingsController);
app.use('/rooms', verifyTokenMiddleware, roomsController);
app.use('/contact', verifyTokenMiddleware, contactController);

app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});

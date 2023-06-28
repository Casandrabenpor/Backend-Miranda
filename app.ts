import express from 'express';
import { usersController } from './controllers/usersController';
import { bookingsController } from './controllers/bookingsController';
import { roomsController } from './controllers/roomsController';
import { verifyTokenMiddleware } from './middleware/auth';
import { contactController } from './controllers/contactController';
import { authenticationController } from './controllers/authController';
import { infoController } from './controllers/infoController';
require('dotenv').config();

export const app = express();
const PORT = 3000;

//public routes
app.use('/login', authenticationController);
app.use('/info', infoController);
//private routes
app.use('/users', verifyTokenMiddleware, usersController);
app.use('/bookings', verifyTokenMiddleware, bookingsController);
app.use('/rooms', verifyTokenMiddleware, roomsController);
app.use('/contact', verifyTokenMiddleware, contactController);

app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});

export default app;

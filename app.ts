import express, { Request, Response } from 'express';
import {
  deleteUserController,
  getUsersController,
  postUsersController,
  putUsersController,
} from './controllers/usersController';
import bodyParser from 'body-parser';
import {
  getBookingController,
  postBookingController,
  putBookingController,
} from './controllers/bookingsController';

const app = express();
const PORT = 3000;

app.get('/', function (req: Request, res: Response) {
  res.send('hello');
});

app
  .route('/users')
  .get(function (req, res) {
    res.status(200).send(getUsersController());
  })
  .post(bodyParser.json(), function (req, res) {
    res.status(200).send(postUsersController(req.body));
  })
  .put(bodyParser.json(), function (req, res) {
    res.status(200).send(putUsersController(req.body));
  })
  .delete(bodyParser.json(), function (req, res) {
    let id = parseInt(req.query.id as string);
    res.status(200).send(deleteUserController(id));
  });

app
  .route('/bookings')
  .get(function (req, res) {
    res.status(200).send(getBookingController());
  })
  .post(bodyParser.json(), function (req, res) {
    res.status(200).send(postBookingController(req.body));
  })
  .put(bodyParser.json(), function (req, res) {
    res.status(200).send(putBookingController(req.body));
  });

app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});

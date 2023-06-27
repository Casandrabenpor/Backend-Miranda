import { Router } from 'express';
import bodyParser from 'body-parser';
import {
  generateAccessToken,
  isUserAuthenticated,
} from '../services/authService';
export const authenticationController = Router();

authenticationController.post('', bodyParser.json(), (req, res) => {
  if (isUserAuthenticated(req.body) === false) {
    return res.status(401).json({ message: 'Invalid username' });
  } else {
    let token = generateAccessToken(req.body);
    return res.status(200).json({ token: token });
  }
});

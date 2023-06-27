import { Login } from '../models/interface';
import jwt from 'jsonwebtoken';

export const isUserAuthenticated = (login: Login) => {
  if (
    login.name === 'casandra' &&
    login.email === 'casandra@gmail.com' &&
    login.password === 'test'
  ) {
    return true;
  } else {
    return false;
  }
};

export const generateAccessToken = (login: Login) => {
  return jwt.sign(login.name, process.env.SECRET_KEY as string);
};

import { Router } from 'express';
import { getInfo } from '../services/infoService';

export const infoController = Router();

infoController.get('', (req, res) => {
  res.status(200).json(getInfo());
});

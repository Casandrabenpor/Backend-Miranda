import { Router } from 'express';
import { contactController } from '../controllers/contactController';

const contactRouter = Router();

contactRouter.use('/contact', contactController);

export default contactRouter;

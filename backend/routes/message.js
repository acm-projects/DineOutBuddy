import express from 'express';

export const router = express.Router();
import isAuth from '../middlewares/auth.js';
import { allMessages, sendMessage } from '../controllers/message.js';


router.post('/', isAuth, sendMessage);
router.get('/:chatId', isAuth, allMessages);


export default router;
import express from 'express';

export const router = express.Router();
import isAuth from '../middlewares/auth.js';
import { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } from '../controllers/chat.js';


// Fetch one on one chats
router.post("/",isAuth, accessChat);
router.get("/", isAuth, fetchChats);
router.post("/group", isAuth, createGroupChat);
router.put("/rename", isAuth, renameGroup);
router.put("/groupremove", isAuth, removeFromGroup)
router.put("/groupadd", isAuth, addToGroup);


export default router;
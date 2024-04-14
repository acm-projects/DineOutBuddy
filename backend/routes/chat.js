import express from "express";

export const router = express.Router();
import isAuth from "../middlewares/auth.js";
import {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
  uploadProfile,
} from "../controllers/chat.js";
import multer from "multer";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file", false);
  }
};

const uploads = multer({ storage: storage, fileFilter });
// Fetch one on one chats
router.post("/", isAuth, accessChat);
router.get("/", isAuth, fetchChats);
router.post("/group", isAuth, createGroupChat);
router.put("/rename", isAuth, renameGroup);
router.put("/groupremove", isAuth, removeFromGroup);
router.put("/groupadd", isAuth, addToGroup);
router.post(
  "/upload-profile",
  isAuth,
  uploads.single("profile"),
  uploadProfile
);

export default router;

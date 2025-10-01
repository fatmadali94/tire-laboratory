// routes/users.js
import express from 'express';
import { getUserInfo, updateUserInfo } from '../controllers/userController.js';
import upload from '../middleware/multer.js'; // for image upload
import verifyToken from '../middleware/verifyToken.js'; // optional auth

const router = express.Router();

// Get user info by ID
router.get('/:id', getUserInfo);

// Update user profile
router.put('/:id', verifyToken, upload.single('image'), updateUserInfo);

export default router;

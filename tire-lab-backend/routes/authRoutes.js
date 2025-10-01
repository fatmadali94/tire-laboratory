// routes/auth.js
import express from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/signup', upload.single('image'), signUp);
router.post('/signin', signIn);

export default router;

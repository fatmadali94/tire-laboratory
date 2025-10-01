// controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/userModel.js';
import cloudinary from '../utils/cloudinary.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export async function signUp(req, res) {
  try {
    const { name, email, password, mobile, position } = req.body;

    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'tire-lab/users',
      });
      imageUrl = result.secure_url;
    }

    const existing = await findUserByEmail(email);
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await createUser({
      name, email, password: hashed, mobile, position, image: imageUrl
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Signup error', error: err.message });
  }
}


export async function signIn(req, res) {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, email: user.email, image: user.image, position: user.position, mobile: user.mobile }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, image: user.image, position: user.position, mobile: user.mobile } });
    } catch (err) {
        res.status(500).json({ message: 'Signin error', error: err.message });
    }
}

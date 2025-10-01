import { findUserById, updateUser } from '../models/userModel.js';
import cloudinary from '../utils/cloudinary.js';

export async function getUserInfo(req, res) {
  try {
    const user = await findUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
}

export async function updateUserInfo(req, res) {
  try {
    const { name, email, mobile, position } = req.body;
    let imageUrl = req.body.image;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'tire-lab/users',
      });
      imageUrl = result.secure_url;
    }

    const updated = await updateUser(req.params.id, {
      name,
      email,
      mobile,
      position,
      image: imageUrl,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
}

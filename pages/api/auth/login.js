import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import bcrypt from 'bcrypt';
import { createAccessToken, createRefreshToken } from '../../../utils/generateToken';

connectDB();

export default async (req, res) => {
  console.log(`[API] ${req.method} /api/auth/login initiated at ${new Date().toISOString()}`);
  switch (req.method) {
    case 'POST':
      await login(req, res);
      break;
    default:
      console.warn(`[API Warning] ${req.method} not allowed on /api/auth/login`);
      res.status(405).json({ err: 'Method not allowed.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      console.warn(`[API Warning] Login failed for email: ${email} - User does not exist.`);
      return res.status(400).json({ err: 'This user does not exist.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn(`[API Warning] Login failed for email: ${email} - Incorrect password.`);
      return res.status(400).json({ err: 'Incorrect password.' });
    }

    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });

    console.log(`[API] Login successful for user: ${email} (ID: ${user._id})`);
    res.json({
      msg: 'Login Success!',
      refresh_token,
      access_token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (err) {
    console.error(`[API Error] Login failed:`, err);
    return res.status(500).json({ err: err.message });
  }
};
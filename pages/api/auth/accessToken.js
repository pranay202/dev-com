import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import jwt from 'jsonwebtoken';
import { createAccessToken } from '../../../utils/generateToken';

connectDB();

export default async (req, res) => {
  console.log(`[API] ${req.method} /api/auth/accessToken initiated at ${new Date().toISOString()}`);
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) {
      console.warn('[API Warning] Refresh token missing from request cookies.');
      return res.status(400).json({ err: 'Please login now!' });
    }

    const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
    if (!result) {
      console.warn('[API Warning] Refresh token verification failed.');
      return res.status(400).json({ err: 'Your token is incorrect or has expired.' });
    }

    const user = await Users.findById(result.id);
    if (!user) {
      console.warn(`[API Warning] User from token not found: ID ${result.id}`);
      return res.status(400).json({ err: 'User does not exist.' });
    }

    const access_token = createAccessToken({ id: user._id });
    console.log(`[API] Access token refreshed successfully for user ID: ${user._id}`);
    res.json({
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
    console.error('[API Error] Access token refresh failed:', err);
    return res.status(500).json({ err: err.message });
  }
};

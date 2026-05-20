import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import valid from '../../../utils/valid';
import bcrypt from 'bcrypt';

connectDB();

export default async (req, res) => {
  console.log(`[API] ${req.method} /api/auth/register initiated at ${new Date().toISOString()}`);
  switch (req.method) {
    case 'POST':
      await register(req, res);
      break;
    default:
      console.warn(`[API Warning] ${req.method} not allowed on /api/auth/register`);
      res.status(405).json({ err: 'Method not allowed.' });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, cf_password } = req.body;

    const errMsg = valid(name, email, password, cf_password);
    if (errMsg) {
      console.warn(`[API Warning] Registration validation failed: ${errMsg}`);
      return res.status(400).json({ err: errMsg });
    }

    const user = await Users.findOne({ email });
    if (user) {
      console.warn(`[API Warning] Registration failed: email already exists - ${email}`);
      return res.status(400).json({ err: 'This email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new Users({
      name,
      email,
      password: passwordHash,
    });

    await newUser.save();
    console.log(`[API] Registration successful for new user: ${email} (ID: ${newUser._id})`);
    res.json({ msg: 'Register Success!' });
  } catch (err) {
    console.error('[API Error] Registration failed:', err);
    return res.status(500).json({ err: err.message });
  }
};
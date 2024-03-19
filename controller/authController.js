import catchAsync from '../untils/catchAsync.js';
import Users from '../modal/users.js';

const authController = {
  login: catchAsync(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'email and password are required' });
    }

    try {
      const user = await Users.findOne({ email, password });
      console.log('user', user);
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
      // Handle any errors
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }),
};
export default authController;

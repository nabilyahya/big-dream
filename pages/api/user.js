import dbConnect from '../../utils/db';
import User from '@/models/User';

export default async (req, res) => {
  const { method } = req;
  const { name } = req.query; // Use `name` from the query string

  console.log('Received name:', name);
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        // Fetch user by name instead of id
        const user = await User.findOne({ name });
        console.log('User Found:', user);
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
      try {
        // Update user by name instead of id
        const user = await User.findOneAndUpdate({ name }, req.body, { new: true, runValidators: true });
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: 'Method not allowed' });
      break;
  }
};

import connectDB from '../../utils/db';
import User from '../../models/User';

connectDB();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { name, age, gender, maritalStatus, picture, role,password  } = req.body;
        if (!gender) {
          return res.status(400).json({ message: 'Gender is required' });
        }
        const user = new User({ name, age, gender, maritalStatus, picture, role,password  });
        await user.save();
        res.status(201).json(user);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
};

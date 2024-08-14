import connectDB from '../../../utils/db';
import Room from '../../../models/Room';
import User from '../../../models/User';

connectDB();

export default async (req, res) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const room = await Room.findById(id).populate('admin').populate('users');
        if (!room) {
          return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json(room);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    case 'PATCH':
      try {
        const { userId } = req.body;
        const room = await Room.findById(id);
        if (!room) {
          return res.status(404).json({ message: 'Room not found' });
        }
        if (!room.users.includes(userId)) {
          room.users.push(userId);
          await room.save();
        }
        res.status(200).json(room);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
};

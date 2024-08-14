import User from '@/models/User';
import Room from '@/models/Room';
import dbConnect from '@/utils/db';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
    const { name, roomId, password } = req.body;
    
    await dbConnect();
  
    try {
      console.log(`Login attempt - Name: ${name}, Room ID: ${roomId}`);
  
      // Find the user by name
      const user = await User.findOne({ name });
      if (!user) {
        console.error(`User not found: ${name}`);
        return res.status(400).json({ message: 'Invalid credentials', error: 'User not found' });
      }
  
      // Find the room by roomId
      const room = await Room.findById(roomId);
      if (!room) {
        console.error(`Room not found: ${roomId}`);
        return res.status(400).json({ message: 'Room not found', error: 'Room not found' });
      }
  
      // Check if the user belongs to the room
      if (!room.users.includes(user._id)) {
        console.error(`User ${user._id} is not part of room ${roomId}`);
        return res.status(400).json({ message: 'User not part of the room', error: 'User not part of room' });
      }
  
      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.error(`Password mismatch for user ${name}`);
        return res.status(400).json({ message: 'Invalid credentials', error: 'Password mismatch' });
      }
  
      // Return user and room details
      res.status(200).json({ user, room });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
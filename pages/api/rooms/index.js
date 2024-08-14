import dbConnect from '../../../utils/db'; // Your database connection utility
import Room from '../../../models/Room'; // Your Room model

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'POST':
      const { name } = req.body;
      try {
        if (!name) {
          throw new Error('Room name is required');
        }
        const newRoom = await Room.create({ name });
        res.status(201).json(newRoom);
      } catch (error) {
        console.error('Error creating room:', error);
        res.status(400).json({ 
          error: 'Error creating room',
          message: error.message,
          stack: error.stack 
        });
      }
      break;
      
    case 'GET':
      try {
        const rooms = await Room.find({});
        res.status(200).json(rooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ error: 'Error fetching rooms' });
      }
      break;

    case 'PATCH':
      // Handle PATCH request logic here if needed
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}

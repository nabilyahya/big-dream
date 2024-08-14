import React, { useState } from 'react';
import axiosInstance from '@/utils/axiosConfig';
import { useRouter } from 'next/router';

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: room } = await axiosInstance.post('/rooms', { name: roomName });
      router.push(`/room/${room._id}`);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-sm mx-auto">
      <input 
        type="text" 
        value={roomName} 
        onChange={(e) => setRoomName(e.target.value)} 
        placeholder="Room Name" 
        required 
        className="p-2 border rounded w-full"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">Create Room</button>
    </form>
  );
};

export default CreateRoom;

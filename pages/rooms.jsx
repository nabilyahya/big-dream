import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axiosInstance from '@/utils/axiosConfig';
import { useRouter } from 'next/router';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axiosInstance.get('/rooms');
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const joinRoom = async (roomId) => {
    try {
      await axiosInstance.patch(`/rooms/${roomId}`, { userId });
      router.push(`/room/${roomId}`);
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  return (
    <div>
      <h1>Available Rooms</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            <span>{room.name}</span>
            <button onClick={() => joinRoom(room._id)}>Join</button>
          </li>
        ))}
      </ul>
      <Link href="/create-room">Create Room</Link>
    </div>
  );
};

export default Rooms;

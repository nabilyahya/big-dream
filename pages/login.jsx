import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import axiosInstance from '@/utils/axiosConfig'; // Make sure to update the import path
const bcrypt = require('bcryptjs');

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [roomId] = useState('66ae35759d088c43be0c6472');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Authenticate user and get their ID
      const response = await axiosInstance.post('/auth/login', { name, password ,roomId});
      const { userId } = response.data; // Assuming the response contains userId and roomId

      // Save user data to local storage
      localStorage.setItem('user', JSON.stringify({ name, userId, roomId }));

      // Redirect to the room page
      router.push(`/room/${roomId}`);
    } catch (error) {
        
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex flex-col justify-center items-center">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Name</label>
          <div className="flex items-center border border-gray-300 p-3 rounded-lg">
            <FaUser className="text-gray-400 mr-3" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="flex-1 focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <div className="flex items-center border border-gray-300 p-3 rounded-lg">
            <FaLock className="text-gray-400 mr-3" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="flex-1 focus:outline-none"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out flex items-center justify-center"
        >
          <FaSignInAlt className="mr-2" />
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

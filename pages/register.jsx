import React, { useState } from 'react';
import axiosInstance from '@/utils/axiosConfig';
import { useRouter } from 'next/router';
import { FaUser, FaCalendarAlt, FaGenderless, FaHeart, FaImage } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    maritalStatus: '',
    picture: '',
    password: '' // Add password field
  });
  const router = useRouter();

  // Function to generate a 5-digit password
  const generatePassword = () => {
    return Math.floor(10000 + Math.random() * 90000).toString(); // Generate a 5-digit number as a string
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.age || !formData.gender || !formData.maritalStatus) {
      alert('Please fill in all required fields');
      return;
    }

    // Generate a 5-digit password
    const password = generatePassword();

    // Set password in formData
    const updatedFormData = { ...formData, password };

    try {
      const { data: user } = await axiosInstance.post('/users', updatedFormData);

      // Save user data in local storage
      const userData = { ...updatedFormData, id: user._id };
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('User data saved to local storage:', userData);

      // Navigate to the rooms page
      router.push(`/rooms?userId=${user._id}`);
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <FaUser className="text-gray-500 ml-3" />
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Name"
              className="flex-1 p-2 border-none outline-none"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <FaCalendarAlt className="text-gray-500 ml-3" />
            <input
              type="number"
              name="age"
              onChange={handleChange}
              placeholder="Age"
              className="flex-1 p-2 border-none outline-none"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <FaGenderless className="text-gray-500 ml-3" />
            <select
              name="gender"
              onChange={handleChange}
              value={formData.gender}
              className="flex-1 p-2 border-none outline-none"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <FaHeart className="text-gray-500 ml-3" />
            <input
              type="text"
              name="maritalStatus"
              onChange={handleChange}
              placeholder="Marital Status"
              className="flex-1 p-2 border-none outline-none"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <FaImage className="text-gray-500 ml-3" />
            <input
              type="text"
              name="picture"
              onChange={handleChange}
              placeholder="Picture URL"
              className="flex-1 p-2 border-none outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

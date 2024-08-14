import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaTransgender, FaHeart, FaBirthdayCake, FaImage, FaEdit, FaSave, FaTimes, FaPen } from 'react-icons/fa';
import axios from '../utils/axiosConfig';

const AccountInfo = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    password: '',
    gender: '',
    maritalStatus: '',
    age: '',
    picture: '',
  });
  const [originalUserInfo, setOriginalUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve the name from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        console.log('User from Local Storage:', user);
        const name = user.name;

        // Fetch user data based on the name
        const response = await axios.get(`/user?name=${name}`);
        setUserInfo(response.data.data);
        setOriginalUserInfo(response.data.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const name = user.name;
      await axios.put(`/user?name=${name}`, userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data', error);
    }
  };

  const handleCancel = () => {
    setUserInfo(originalUserInfo);
    setIsEditing(false);
    setError(''); // Clear any previous error messages
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={userInfo.picture || 'https://via.placeholder.com/100'}
              alt="User Picture"
              className="w-32 h-32 rounded-full object-cover"
            />
            {isEditing && (
              <button
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full"
                onClick={() => alert('Edit picture clicked')}
              >
                <FaPen />
              </button>
            )}
          </div>
          <h2 className="text-2xl font-bold mt-4 mb-4 text-center">Account Info</h2>
        </div>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none"
            />
          ) : (
            <p className="flex items-center">
              <FaUser className="text-gray-400 mr-2" /> {userInfo.name}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          {isEditing ? (
            <input
              type="password"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none"
            />
          ) : (
            <p className="flex items-center">
              <FaLock className="text-gray-400 mr-2" /> ••••••••
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Gender</label>
          {isEditing ? (
            <input
              type="text"
              name="gender"
              value={userInfo.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none"
            />
          ) : (
            <p className="flex items-center">
              <FaTransgender className="text-gray-400 mr-2" /> {userInfo.gender || 'Not specified'}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Marital Status</label>
          {isEditing ? (
            <select
              name="maritalStatus"
              value={userInfo.maritalStatus}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none"
            >
              <option value="">Select</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          ) : (
            <p className="flex items-center">
              <FaHeart className="text-gray-400 mr-2" /> {userInfo.maritalStatus || 'Not specified'}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Age</label>
          {isEditing ? (
            <input
              type="number"
              name="age"
              value={userInfo.age}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none"
            />
          ) : (
            <p className="flex items-center">
              <FaBirthdayCake className="text-gray-400 mr-2" /> {userInfo.age}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Picture URL</label>
          {isEditing ? (
            <input
              type="text"
              name="picture"
              value={userInfo.picture}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none"
            />
          ) : (
            <p className="flex items-center">
              <FaImage className="text-gray-400 mr-2" /> {userInfo.picture || 'No picture'}
            </p>
          )}
        </div>
        {isEditing ? (
          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out flex items-center justify-center"
            >
              <FaSave className="mr-2" /> Save
            </button>
            <button
              onClick={handleCancel}
              className="w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition duration-150 ease-in-out flex items-center justify-center"
            >
              <FaTimes className="mr-2" /> Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="w-full bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-150 ease-in-out flex items-center justify-center"
          >
            <FaEdit className="mr-2" /> Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default AccountInfo;

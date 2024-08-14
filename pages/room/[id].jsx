import React, { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosConfig';
import { useRouter } from 'next/router';
import { FaUser, FaPaperPlane, FaSmile, FaBars, FaCog, FaSignOutAlt } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const Room = () => {
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  // Define a color map for different users
  const userColors = {
    Alice: 'bg-green-100 text-green-800',
    Bob: 'bg-yellow-100 text-yellow-800',
    You: 'bg-blue-100 text-blue-800',
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await axiosInstance.get(`/rooms/${id}`);
        setRoom(data);
        // Simulate fetching messages (replace with actual fetch logic)
        setMessages([
          { id: 1, text: 'Hello there!', user: { name: 'Alice', image: '/path/to/alice.jpg' }, time: '10:00 AM' },
          { id: 2, text: 'Hi Alice!', user: { name: 'Bob', image: '/path/to/bob.jpg' }, time: '10:05 AM' },
        ]);
      } catch (error) {
        console.error('Error fetching room:', error);
      }
    };

    if (id) {
      fetchRoom();
    }
  }, [id]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() === '') return;

    // Add new message to messages (you can replace this with API call)
    setMessages([
      ...messages,
      { id: messages.length + 1, text: messageInput, user: { name: 'You', image: '/path/to/your.jpg' }, time: new Date().toLocaleTimeString() },
    ]);
    setMessageInput('');
  };

  const handleAddEmoji = (event, emojiObject) => {
    setMessageInput(prev => prev + emojiObject.emoji);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleEmojiPicker = () => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">Room: {room ? room.name : 'Loading...'}</h1>
        <button onClick={toggleSidebar} className="focus:outline-none">
          <FaBars size={24} />
        </button>
      </header>
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleSidebar}>
        <div className={`absolute top-0 right-0 w-64 bg-white h-full shadow-lg transition-transform transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} z-20`}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <ul className="space-y-4">
              <li className="flex items-center space-x-2 text-gray-700">
                <FaUser size={20} />
                <span>Your Account</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-700">
                <FaCog size={20} />
                <span>Settings</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-700">
                <FaSignOutAlt size={20} />
                <span>Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <main className="flex-1 pt-1 flex flex-col">
        {room ? (
          <div className="bg-white pt-1 rounded-lg shadow-lg flex flex-col flex-1">
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-inner space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start ${msg.user.name === 'You' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.user.name !== 'You' && (
                    <img
                      src={msg.user.image}
                      alt={msg.user.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  <div
                    className={`max-w-xs p-3 rounded-lg ${userColors[msg.user.name] || 'bg-gray-200 text-gray-800'}`}
                  >
                    <span className="block text-sm text-gray-500">{msg.user.name}</span>
                    <p>{msg.text}</p>
                    <span className="block text-xs text-gray-400">{msg.time}</span>
                  </div>
                  {msg.user.name === 'You' && (
                    <FaUser className="text-blue-500 ml-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Loading room details...</p>
        )}
      </main>
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 shadow-md flex items-center space-x-4">
        <button
          type="button"
          onClick={toggleEmojiPicker}
          className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-150 ease-in-out"
        >
          <FaSmile />
        </button>
        {isEmojiPickerOpen && (
          <div className="absolute bottom-16 left-0 z-20">
            <EmojiPicker onEmojiClick={handleAddEmoji} />
          </div>
        )}
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        />
        <button
          type="submit"
          onClick={handleSendMessage}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Room;

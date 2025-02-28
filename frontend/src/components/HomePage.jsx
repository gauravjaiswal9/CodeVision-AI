import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="text-4xl font-bold text-white mb-8">Welcome to Code Review System</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:text-white transition duration-300"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-md hover:bg-purple-700 hover:text-white transition duration-300"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default HomePage;

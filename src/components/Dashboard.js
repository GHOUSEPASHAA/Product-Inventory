// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const fetchProtectedData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/protected', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log('Error fetching data', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Welcome to Dashboard</h2>
        <button onClick={fetchProtectedData} className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Fetch Protected Data
        </button>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md mt-4">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

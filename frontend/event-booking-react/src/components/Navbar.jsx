// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../api/axiosClient';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [message, setMessage] = useState('');

  const handleLogout = async() => {
    try {
      const logoutMessage = await axiosClient.post('/api/logout');
      setMessage(logoutMessage.data.message);
      console.log('Logout message:', logoutMessage.data.message);
      setTimeout(() => {
        setMessage('');
      }, 3000); // Clear message after 3 seconds
      
     await logout();
    } catch (error) {
      console.error('Logout error:', error);
      setMessage('حدث خطأ أثناء تسجيل الخروج');
      
    }

  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">الحجوزات</Link>

      <div className="flex items-center space-x-4 space-x-reverse">
        {user ? (
          <>
  <Link to="/my-bookings" className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700">
    حجوزاتي
  </Link>
          {user.role === 'admin' && (
            <Link to="/admin" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
              لوحة التحكم
            </Link>
          )}

          

            <span>مرحباً، {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              تسجيل الخروج
            </button>
            
      {message && <p className="mb-4 text-xl text-green-600">{message}</p>}
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">تسجيل الدخول</Link>
            <Link to="/register" className="hover:underline">إنشاء حساب</Link>
          </>
        )}
      </div>
    </nav>
  );
}

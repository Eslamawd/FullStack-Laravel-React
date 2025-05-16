// src/pages/MyBookings.jsx
import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

// MyBookings.jsx
// This component fetches and displays the user's bookings
export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axiosClient.get('/api/my-bookings')
      .then(res => setBookings(res.data))
      .catch(err => console.error('خطأ في جلب الحجوزات:', err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">حجوزاتي</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-600">لا يوجد حجوزات بعد.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-semibold">{booking.event?.name}</h2>
              <p><strong>المكان:</strong> {booking.event?.venue}</p>
              <p><strong>التاريخ:</strong> {new Date(booking.event?.date).toLocaleDateString()}</p>
              <p><strong>السعر:</strong> {booking.event?.price} جنيه</p>
              <p><strong>تاريخ الحجز:</strong> {new Date(booking.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

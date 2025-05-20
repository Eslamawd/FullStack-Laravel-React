import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

export default function EventCard({ event, addBooking, myBookings }) {
  const { user } = useAuth(); // 👈 جلب حالة المستخدم
    const navigate = useNavigate();

  const handleDelete = () => {
    if (confirm('هل أنت متأكد من حذف الفعالية؟')) {
      axiosClient.delete(`/api/events/${event.id}`)
        .then(() => {
          alert('تم حذف الفعالية بنجاح');
          // ممكن تحدث القائمة من parent component بعد الحذف
        })
        .catch(err => console.error(err));
    }
  };


  const isBooked = myBookings.some(booking => booking.event_id === event.id);
  
  return (
    <div className="bg-white shadow-md rounded p-4 space-y-2">
      {event.image_path && (
        <img
          src={`http://localhost:8000/storage/${event.image_path}`}
          alt={event.name}
          className="w-full h-48 object-cover rounded"
        />
      )}
      <h2 className="text-xl font-bold">{event.name}</h2>
      <p>{event.description}</p>
      <p><strong>المكان:</strong> {event.venue}</p>
      <p><strong>التاريخ:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>السعر:</strong> {event.price} جنيه</p>
     
     
    {user ? (
  <button
    onClick={() => addBooking(event.id)}
    disabled={isBooked}
    className={`px-4 py-2 rounded text-white ${
      isBooked ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
    }`}
  >
    {isBooked ? 'تم الحجز' : 'احجز الآن'}
  </button>
) : (
  <button
    disabled
    className="bg-gray-500 text-white px-4 py-2 rounded cursor-not-allowed"
  >
    احجز الآن
  </button>
)}
{user?.role === 'admin' && (
        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => navigate(`/events/${event.id}/edit`)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            تعديل
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            حذف
          </button>
        </div>
      )}

      
    


     
    </div>
  );
}

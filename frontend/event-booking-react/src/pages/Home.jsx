// src/pages/Home.jsx
import  { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import EventCard from '../components/EventCard';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth(); // جلب حالة المستخدم
  const [events, setEvents] = useState([]);
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    if(user) {

      axiosClient.get('/api/my-bookings')
        .then(res => setMyBookings(res.data))
        .catch(err => console.error('خطأ في جلب الحجوزات:', err));
    }
      
 axiosClient.get('/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, [user]);
  

  

  const handleEventClick = async(eventId) => {
    // Handle event click, e.g., navigate to event details
    if (user) { // Check if user is logged in 
      // Assuming you want to send a booking request
      try {
        const saveBooking = await axiosClient.post(`/api/bookings`,
          {'event_id': eventId,} // Assuming you need to send the event ID in the request body
        )
       setMyBookings(prev => [...prev, saveBooking.data.booking]);
        console.log('Booking response:', saveBooking.data);
        
      } catch (error) {
        console.error('Error booking event:', error);
        
      } 
       
    }
  };  


   

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">الفعاليات المتاحة</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {events?.map(event => (
          <EventCard key={event.id} event={event} addBooking={handleEventClick} myBookings={myBookings} />
        ))}
      </div>
    </div>
  );
}

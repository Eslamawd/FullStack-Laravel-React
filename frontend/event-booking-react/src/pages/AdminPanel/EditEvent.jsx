// src/pages/EditEvent.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';

export default function EditEvent() {
  const { id } = useParams(); // جلب ID الفعالية من الـ URL
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    name: '',
    description: '',
    category: '',
    venue: '',
    date: '',
    price: '',
    image_path: null,
  });

  const feathchEvent = async () => {
    try {
      const response = await axiosClient.get(`/api/events/${id}`);
      setEvent({
        ...response.data,
        image_path: response.data.image_path ? response.data.image_path : null,
      });
    } catch (error) {
      console.error('خطأ في جلب الفعالية', error);
    }
  }

  useEffect(() => {
   feathchEvent();
    // Cleanup function to reset the event state if needed
    
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setEvent({ ...event, [name]: e.target.files[0] });
    } else {
      setEvent({ ...event, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', event.name);
    formData.append('description', event.description);
    formData.append('venue', event.venue);
    formData.append('date', event.date);
    formData.append('price', event.price);
    if (event.image instanceof File) {
      formData.append('image', event.image);
    }

    try {
      await axiosClient.post(`/api/events/${id}?_method=PUT`, formData);
      alert('تم التعديل بنجاح');
      navigate('/'); // رجوع للصفحة الرئيسية أو قائمة الفعاليات
    } catch (error) {
      console.error('خطأ في التعديل', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">تعديل الفعالية</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="اسم الفعالية"
          value={event.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="الوصف"
          value={event.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="venue"
          placeholder="المكان"
          value={event.venue}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="السعر"
          value={event.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
}

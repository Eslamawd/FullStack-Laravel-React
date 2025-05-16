import { useState } from 'react';
import axiosClient from '../../api/axiosClient';

export default function CreateEvent() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    date: '',
    venue: '',
    price: '',
    image_path: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      await axiosClient.post('/api/events', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('تم إنشاء الفعالية بنجاح ✅');
      setForm({ name: '', category:'' , description: '', date: '', venue: '', price: '', image_path: null });
    } catch (error) {
      setMessage('حدث خطأ أثناء الحفظ ❌');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded mt-6">
      <h1 className="text-2xl font-bold mb-4">إنشاء فعالية جديدة</h1>
      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="اسم الفعالية" value={form.name} onChange={handleChange} required className="w-full border rounded p-2" />
        <textarea name="description" placeholder="وصف الفعالية" value={form.description} onChange={handleChange} required className="w-full border rounded p-2" />
        <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full border rounded p-2" />
        <input type="text" name="venue" placeholder="المكان" value={form.venue} onChange={handleChange} required className="w-full border rounded p-2" />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required className="w-full border rounded p-2" />
        <input type="number" name="price" placeholder="السعر بالجنيه" value={form.price} onChange={handleChange} required className="w-full border rounded p-2" />
        <input type="file" name="image_path" onChange={handleChange} accept="image/*" className="w-full" />

        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {loading ? 'جاري الحفظ...' : 'إنشاء الفعالية'}
        </button>
      </form>
    </div>
  );
}

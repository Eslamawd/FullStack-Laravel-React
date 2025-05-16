import { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axiosClient.get('/sanctum/csrf-cookie');

      const response = await axiosClient.post('/api/register', form);

      login(response.data.user, response.data.token);

      navigate('/');
    } catch (err) {
      if (err.response?.data?.errors) {
        const errors = Object.values(err.response.data.errors).flat();
        setError(errors.join(', '));
      } else {
        setError('حدث خطأ أثناء التسجيل');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg border rounded">
      <h2 className="text-2xl font-bold mb-4">تسجيل حساب جديد</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">الاسم</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">البريد الإلكتروني</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">كلمة المرور</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">تأكيد كلمة المرور</label>
          <input
            type="password"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          تسجيل
        </button>
      </form>
    </div>
  );
};

export default Register;
// This code defines a Register component that allows users to create a new account. 
// It uses the useState hook to manage form data and error messages.

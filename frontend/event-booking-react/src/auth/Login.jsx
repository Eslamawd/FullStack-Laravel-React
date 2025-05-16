import { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // CSRF token مSanctum
      await axiosClient.get('/sanctum/csrf-cookie');

      const response = await axiosClient.post('/api/login', form);

      // save user and token in local storage
      login(response.data.user, response.data.token);

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ أثناء تسجيل الدخول');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg border rounded">
      <h2 className="text-2xl font-bold mb-4">تسجيل الدخول</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          دخول
        </button>
      </form>
    </div>
  );
};

export default Login;

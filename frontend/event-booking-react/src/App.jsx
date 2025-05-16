import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import EventDetails from './pages/EventDetails';
import Congratulations from './pages/Congratulations';
import CreateEvent from './pages/AdminPanel/CreateEvent';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import MyBookings from './pages/MyBookings';
import EditEvent from './pages/AdminPanel/EditEvent';



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/congrats" element={<Congratulations />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route
            path="events/:id/edit"
            element={
              <ProtectedRoute adminOnly={true} redirectTo="/">
                <EditEvent />
              </ProtectedRoute>
            }/>
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true} redirectTo="/">
                
                <CreateEvent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


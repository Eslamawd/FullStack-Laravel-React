# 🎫 Event Booking System – Laravel + React

This is a full-stack Event Booking platform built using **Laravel (REST API)** and **React (frontend)**. It allows users to browse available events, book tickets, and for admins to manage events and view bookings.

---

## 📦 Features

### 👥 Authentication
- Register, Login, Logout
- Token-based authentication using Sanctum
- Role-based access control (Admin, User)

### 🎟️ Event Booking
- View all available events
- Book event tickets (only for authenticated users)
- Prevent duplicate bookings

### 🛠️ Admin Panel
- Admin can:
  - Create, update, delete events
  - View all bookings related to any event

---

## 🧩 Technologies Used

- **Frontend**: React, Axios, TailwindCSS, React Router
- **Backend**: Laravel 11, Sanctum, MySQL
- **Auth**: Token-based using Laravel Sanctum
- **Role Management**: Middleware (`admin` role)
- **File Upload**: Laravel Storage

---

## 🚀 Setup Instructions

### 📦 Backend (Laravel)

```bash
git clone https://github.com/your-username/event-booking-backend.git
cd event-booking-backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve
⚙️ Configure Sanctum
In .env:

ini
نسخ
تحرير
SESSION_DOMAIN=localhost
SANCTUM_STATEFUL_DOMAINS=http://localhost:3000
🖼️ Images
Images are uploaded to /storage/app/public and served via storage/ symlink.

💻 Frontend (React)
bash
نسخ
تحرير
cd frontend
npm install
npm run dev
📁 Folder Structure
css
نسخ
تحرير
frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── CreateEvent.jsx
│   │   ├── EditEvent.jsx
│   ├── components/
│   │   ├── EventCard.jsx
│   │   ├── Navbar.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── api/
│   │   └── axiosClient.js
🔐 Roles
User: Can register, log in, view and book events.

Admin: Has access to create, update, delete events, and see bookings for events.

📬 API Routes Summary
Method	Endpoint	Controller	Description
POST	/api/login	AuthController@login	Login
POST	/api/register	AuthController@register	Register
GET	/api/me	AuthController@me	Get current user info
POST	/api/logout	AuthController@logout	Logout
GET	/api/events	EventController@index	List events
GET	/api/events/{id}	EventController@show	Show event details
POST	/api/events	EventController@store	(Admin only) Create event
PUT	/api/events/{id}	EventController@update	(Admin only) Update event
DELETE	/api/events/{id}	EventController@destroy	(Admin only) Delete event
POST	/api/bookings	BookingController@store	Book a ticket
GET	/api/my-bookings	BookingController@myBookings	Get user's own bookings
# FullStack-Laravel-React

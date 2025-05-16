# React + Vite

This template provides a minimal setup to get React working in Vite with and TiliwaindCss HMR and some ESLint rules.
uses react router dom & axios


##### 🔐  (Authentication)
src/auth
--------Login
--------Register

🌍 Frontend
🔐 Authentication
● Users can register and log in.
🏠 Home Page (Event Listings)
● Display events using a grid or flexbox layout.
● Events that a user has already booked will show a "Booked" label instead of the
"Book Now" button.
● Each event card includes a "Book Now" button (if not yet booked).
📄 Event Details Page
● Shows full event information:
○ Event Name, Description, Category, Date, Venue, Price, and Image
● Includes a "Book Now" button (books 1 ticket per click for user)
● Upon booking, the user is redirected to a Congratulations screen.
● No payment integration is required.
🧾 Admin Panel
● Admin can Create, Read, Update, and Delete events.
● The admin panel is a separate screen within the same web application.
● User roles are needed (Admin, User).
🎨 UI Design
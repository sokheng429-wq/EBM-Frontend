import { Routes, Route } from 'react-router-dom';

import CustomerHistory from './pages/CustomerHistory';
import UserSetting from './pages/UserSetting';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

import Home from './pages/Home';
import OurMission from './pages/OurMission';
import Aboutus from './pages/Aboutus';
import Login from './pages/Login';
import Register from './pages/Register';
import Booking from './pages/Booking';
import Customer from './pages/Customer';
import Admin from './pages/admin';
import BookingList from './pages/Bookinglist';
import Guests from './pages/Guests';
import Report from './pages/report';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/ourmission"
        element={
          <MainLayout>
            <OurMission />
          </MainLayout>
        }
      />

      <Route
        path="/aboutus"
        element={
          <MainLayout>
            <Aboutus />
          </MainLayout>
        }
      />

      <Route
        path="/about"
        element={
          <MainLayout>
            <Aboutus />
          </MainLayout>
        }
      />

      <Route
        path="/booking"
        element={
          <MainLayout>
            <Booking />
          </MainLayout>
        }
      />

      <Route path="/customer" element={<Customer />} />
        <Route path="/customer/history" element={<CustomerHistory />} />
        <Route path="/customer/settings" element={<UserSetting />} />

      <Route path="/admin" element={<Admin />} />
        <Route path="/admin/bookings" element={<BookingList />} />
        <Route path="/admin/guests" element={<Guests />} />
        <Route path="/admin/reports" element={<Report />} />

      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />

      <Route
        path="/register"
        element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        }
      />
    </Routes>
  );
}

export default App;

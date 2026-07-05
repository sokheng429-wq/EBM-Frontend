import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import OurMission from "./pages/OurMission";
import Aboutus from "./pages/Aboutus";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import AdminBookings from "./pages/AdminBookings";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Routes>
      {/* Main Layout */}
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
        path="/about"
        element={
          <MainLayout>
            <Aboutus />
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
        path="/booking"
        element={
          <MainLayout>
            <Booking />
          </MainLayout>
        }
      />

      <Route
        path="/my-bookings"
        element={
          <MainLayout>
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          </MainLayout>
        }
      />

      <Route
        path="/admin/bookings"
        element={
          <MainLayout>
            <ProtectedRoute adminOnly>
              <AdminBookings />
            </ProtectedRoute>
          </MainLayout>
        }
      />

      {/* Authentication Layout */}
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

      <Route
        path="/forgot-password"
        element={
          <AuthLayout>
            <ForgotPassword />
          </AuthLayout>
        }
      />
    </Routes>
  );
}

export default App;

import { Routes, Route, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./context/useAuth";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import OurMission from "./pages/OurMission";
import Aboutus from "./pages/Aboutus";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import AdminBookings from "./pages/AdminBookings";
import AdminTourPrices from "./pages/AdminTourPrices";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import OAuth2Redirect from "./pages/OAuth2Redirect";

function App() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleOAuthToken, isLoggedIn } = useAuth();

  // Catch ?token= from backend OAuth2 redirect on ANY page.
  // This way it works whether the backend lands on /, /oauth2/redirect,
  // or anywhere else the redirect-uri is configured to point.
  useEffect(() => {
    const token = searchParams.get("token");
    if (token && !isLoggedIn) {
      handleOAuthToken(token)
        .then(() => navigate("/", { replace: true }))
        .catch(() => navigate("/login", { replace: true }));
    }
  }, [searchParams, isLoggedIn, handleOAuthToken, navigate]);

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

      <Route
        path="/admin/tour-prices"
        element={
          <MainLayout>
            <ProtectedRoute adminOnly>
              <AdminTourPrices />
            </ProtectedRoute>
          </MainLayout>
        }
      />

      {/* OAuth2 Redirect — catches ?token= from backend after Google/Facebook login */}
      <Route
        path="/oauth2/redirect"
        element={<OAuth2Redirect />}
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

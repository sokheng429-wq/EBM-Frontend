import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

import Home from './pages/Home';
import OurMission from './pages/OurMission';
import Aboutus from './pages/Aboutus';
import Login from './pages/Login';
import Register from './pages/Register';
import Booking from './pages/Booking';

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

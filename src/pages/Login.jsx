import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useAuth } from '../context/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center position-relative">
      {/* Back Home Button */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="btn btn-success position-absolute top-0 start-0 m-3 shadow-sm"
      >
        Back Home
      </button>

      {/* Login Card */}
      <div className="login-card shadow-lg p-4">
        <h2 className="text-center fw-bold mb-3">Welcome Back</h2>

        <p className="text-center text-muted mb-4">
          Login to EBM Elephant Booking System
        </p>

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="login-username">
              Username / Email
            </label>
            <input
              id="login-username"
              type="text"
              className="form-control"
              placeholder="Enter username or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-success w-100 mt-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-end mb-3">
          <Link
            to="/forgot-password"
            className="text-success text-decoration-none fw-semibold"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Social Login */}
        <div className="text-center mt-4">
          <p className="text-muted mb-2">Or continue with</p>

          {/* Google Login */}
          <a
            href="http://localhost:8081/oauth2/authorization/google"
            className="btn btn-light border w-100 mt-2 d-flex align-items-center justify-content-center gap-3 shadow-sm"
          >
            <FcGoogle size={24} />
            <span>Continue with Google</span>
          </a>

          {/* Facebook Login */}
          <a
            href="http://localhost:8081/oauth2/authorization/facebook"
            className="btn btn-primary w-100 mt-2 d-flex align-items-center justify-content-center gap-3 shadow-sm"
          >
            <FaFacebookF size={20} />
            <span>Continue with Facebook</span>
          </a>
        </div>

        {/* Register */}
        <div className="text-center mt-3">
          <small>
            Don't have an account?{" "}
            <Link to="/register" className="text-success fw-semibold">
              Sign Up
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;

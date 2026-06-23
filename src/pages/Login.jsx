import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginApi } from "../api/AuthApi";
import { useAuth } from "../context/useAuth";

const getJwtPayload = (token) => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  } catch {
    return {};
  }
};

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
      const res = await loginApi({ username, password });
      const token = res.data?.token || res.data?.accessToken || res.data?.jwt;
      const tokenPayload = token ? getJwtPayload(token) : {};
      const userData = res.data?.user || res.data?.data || {
        username: res.data?.username || tokenPayload.username || tokenPayload.sub || username,
        name: res.data?.name || tokenPayload.name,
        email: res.data?.email || tokenPayload.email,
      };

      if (!token) {
        throw new Error("Login response did not include a token");
      }

      login(token, userData);

      navigate("/");
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="login-page d-flex align-items-center justify-content-center position-relative">
        <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-success position-absolute top-0 start-0 m-3 shadow-sm"
        >
          Back Home
        </button>

        <div className="login-card shadow-lg p-4">
          <h2 className="text-center fw-bold mb-3">Welcome Back</h2>

          <p className="text-center text-muted mb-4">
            Login to EBM Elephant Booking System
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="login-username">Username / Email</label>
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
              <label className="form-label" htmlFor="login-password">Password</label>
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

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useAuth } from '../context/useAuth';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  // form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // validation + submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await register(formData.username, formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create your account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page d-flex align-items-center justify-content-center position-relative">

      {/* BACK BUTTON */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="btn btn-success position-absolute top-0 start-0 m-3 shadow-sm"
      >
        Back Home
      </button>

      <div className="auth-card shadow-lg p-4">

        {/* TITLE */}
        <h2 className="text-center fw-bold mb-3">Create Account</h2>
        <p className="text-center text-muted mb-4">
          Join EBM to book ethical elephant tours in Mondulkiri.
        </p>

        {/* ERROR */}
        {error && (
          <div className="alert alert-danger py-2 text-center">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          {/* USERNAME */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              id="username"
              type="text"
              className="form-control"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="form-control"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="btn btn-warning w-100 mt-2 fw-bold"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* OR */}
        <div className="text-center mt-3 text-muted">
          <small>Or sign up with</small>
        </div>

        {/* GOOGLE */}
        <a
          href="https://ebm-backend.onrender.com/oauth2/authorization/google"
          className="btn btn-outline-danger w-100 mt-2 d-flex align-items-center justify-content-center gap-2"
        >
          <FcGoogle size={22} />
          Continue with Google
        </a>

        {/* FACEBOOK */}
        <a
          href="https://ebm-backend.onrender.com/oauth2/authorization/facebook"
          className="btn btn-outline-primary w-100 mt-2 d-flex align-items-center justify-content-center gap-2"
        >
          <FaFacebookF size={20} />
          Continue with Facebook
        </a>

        {/* LOGIN LINK */}
        <div className="text-center mt-3">
          <small>
            Already have an account?{' '}
            <Link to="/login" className="text-success fw-semibold">
              Sign In
            </Link>
          </small>
        </div>

      </div>
    </div>
  );
};

export default Register;

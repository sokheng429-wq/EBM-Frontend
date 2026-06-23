import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../api/UserApi';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await createUser(formData);
      setSuccess('Account created successfully. Please sign in.');
      setTimeout(() => {
        navigate('/login');
      }, 800);
    } catch {
      setError('Could not create account. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page d-flex align-items-center justify-content-center position-relative">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="btn btn-success position-absolute top-0 start-0 m-3 shadow-sm"
      >
        Back Home
      </button>

      <div className="auth-card shadow-lg p-4">
        <h2 className="text-center fw-bold mb-3">Create Account</h2>
        <p className="text-center text-muted mb-4">
          Join EBM to book ethical elephant tours in Mondulkiri.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="register-username">
              Username
            </label>
            <input
              id="register-username"
              name="username"
              type="text"
              className="form-control"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="register-email">
              Email
            </label>
            <input
              id="register-email"
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="register-password">
              Password
            </label>
            <input
              id="register-password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger py-2">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success py-2">
              {success}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-warning w-100 mt-2 fw-bold"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

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

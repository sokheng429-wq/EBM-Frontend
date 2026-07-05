import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Call your Spring Boot API here
    console.log("Email:", email);

    alert("If this email exists, a password reset link has been sent.");
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center position-relative">
      {/* Back to Login */}
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="btn btn-success position-absolute top-0 start-0 m-3 shadow-sm"
      >
        Back Login
      </button>

      {/* Forgot Password Card */}
      <div className="login-card shadow-lg p-4">
        <h2 className="text-center fw-bold mb-3">
          Forgot Password
        </h2>

        <p className="text-center text-muted mb-4">
          Enter your registered email address and we'll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-success fw-semibold text-decoration-none"
            >
              Login
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
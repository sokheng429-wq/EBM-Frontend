import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword, verifyOtp, resetPassword } from "../api/AuthApi";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password, 4: done
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await forgotPassword(email);
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await verifyOtp(email, otp);
      setMessage(res.data.message);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword(email, newPassword);
      setMessage(res.data.message + " You can now log in.");
      setStep(4);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page d-flex align-items-center justify-content-center position-relative">
      {/* Back Home Button */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="btn btn-success position-absolute top-0 start-0 m-3 shadow-sm"
      >
        Back Home
      </button>

      <div className="auth-card shadow-lg p-4">
        <h2 className="text-center fw-bold mb-3">Reset Your Password</h2>
        <p className="text-center text-muted mb-4">
          Enter your email and we'll send you a one-time code to reset your password.
        </p>

        {message && (
          <div className="alert alert-success py-2 text-center">{message}</div>
        )}
        {error && (
          <div className="alert alert-danger py-2 text-center">{error}</div>
        )}

        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <div className="mb-3">
              <label className="form-label" htmlFor="fp-email">
                Email address
              </label>
              <input
                id="fp-email"
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
              className="btn btn-success w-100 mt-2"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <div className="mb-3">
              <label className="form-label" htmlFor="fp-otp">
                Enter the 6-digit OTP sent to {email}
              </label>
              <input
                id="fp-otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                className="form-control text-center"
                placeholder="------"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-success w-100 mt-2"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setOtp("");
                setMessage("");
                setError("");
              }}
              className="btn btn-link w-100 text-success text-decoration-none mt-2 p-0"
            >
              Change email
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <div className="mb-3">
              <label className="form-label" htmlFor="fp-new">
                New password
              </label>
              <input
                id="fp-new"
                type="password"
                className="form-control"
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="fp-confirm">
                Confirm new password
              </label>
              <input
                id="fp-confirm"
                type="password"
                className="form-control"
                placeholder="Re-enter your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <button
              type="submit"
              className="btn btn-warning w-100 mt-2 fw-bold"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {step === 4 && (
          <div className="text-center">
            <p className="mb-3">Your password has been reset.</p>
            <Link to="/login" className="btn btn-success w-100">
              Go to Login
            </Link>
          </div>
        )}

        {step !== 4 && (
          <div className="text-center mt-3">
            <small>
              Remember your password?{" "}
              <Link to="/login" className="text-success fw-semibold">
                Sign In
              </Link>
            </small>
          </div>
        )}
      </div>
    </div>
  );
}
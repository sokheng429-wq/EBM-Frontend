import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const OAuth2Redirect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleOAuthToken } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setError("No token received from OAuth2 provider.");
      return;
    }

    handleOAuthToken(token)
      .then(() => navigate("/", { replace: true }))
      .catch(() => setError("Failed to fetch user profile with OAuth2 token."));
  }, []);

  if (error) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <div className="alert alert-danger">{error}</div>
          <button className="btn btn-success" onClick={() => navigate("/login")}>
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <div className="spinner-border text-success mb-3" role="status" />
        <p className="text-muted">Signing you in...</p>
      </div>
    </div>
  );
};

export default OAuth2Redirect;

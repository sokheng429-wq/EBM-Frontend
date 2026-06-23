import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, user } = useAuth();
  const displayName = user?.name || user?.fullName || user?.username || user?.email || "User";

  const handleToursClick = () => {
    navigate("/");

    setTimeout(() => {
      document.getElementById("tours")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect after logout
  };

  return (
      <nav className="navbar navbar-expand-lg navbar-dark ebm-navbar shadow-sm sticky-top">
        <div className="container">

          <Link className="navbar-brand fw-bold fs-3" to="/">
            Mondul<span className="text-warning">Kiri</span>
          </Link>

          <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto gap-lg-2">

              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/ourmission">Our Mission</Link>
              </li>

              <li className="nav-item">
                <button
                    className="nav-link btn btn-link text-white text-decoration-none"
                    onClick={handleToursClick}
                >
                  Tours
                </button>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/aboutus">About Us</Link>
              </li>

            </ul>

            {/* 🔥 AUTH-BASED UI */}
            <div className="navbar-actions d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">

              {!isLoggedIn ? (
                  <>
                    <Link to="/login" className="btn btn-outline-light px-3">
                      Sign In
                    </Link>

                    <Link to="/register" className="btn btn-warning px-3">
                      Sign Up
                    </Link>
                  </>
              ) : (
                  <>
                    <span className="navbar-user-badge me-2">
                            👋 {displayName}
                          </span>

                    <button
                        onClick={handleLogout}
                        className="btn btn-outline-danger px-3"
                    >
                      Logout
                    </button>
                  </>
              )}

              <Link to="/booking" className="btn btn-danger px-3">
                Book Now
              </Link>
            </div>

          </div>

        </div>
      </nav>
  );
};

export default Navbar;

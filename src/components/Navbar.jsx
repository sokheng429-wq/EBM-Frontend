import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, user, logout } = useAuth();

  // Smooth scroll to tours section
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
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark ebm-navbar shadow-sm sticky-top">
      <div className="container">

        {/* LOGO */}
        <Link className="navbar-brand fw-bold fs-3" to="/">
          Mondul<span className="text-warning">Kiri</span>
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV LINKS */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-lg-2">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/ourmission">
                Our Mission
              </Link>
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
              <Link className="nav-link" to="/aboutus">
                About Us
              </Link>
            </li>

            {isLoggedIn && !isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/my-bookings">
                  My Bookings
                </Link>
              </li>
            )}

            {isAdmin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/bookings">
                    Manage Bookings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/tour-prices">
                    Tour Prices
                  </Link>
                </li>
              </>
            )}

          </ul>

          {/* BUTTONS */}
          <div className="navbar-actions d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0 align-items-lg-center">

            {isLoggedIn ? (
              <>
                <span className="text-white-50 small d-none d-lg-inline">
                  Hi, {user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-light px-3"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light px-3">
                  Sign In
                </Link>

                <Link to="/register" className="btn btn-warning px-3">
                  Sign Up
                </Link>
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

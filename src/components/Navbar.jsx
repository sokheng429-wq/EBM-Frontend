import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaCaretDown, FaUserShield, FaUserTie } from 'react-icons/fa';
import { useAuth } from '../context/useAuth';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, user, logout } = useAuth();

  // First letter of the username for the avatar circle.
  const firstInitial = (user?.username || 'U').charAt(0).toUpperCase();

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
              <div className="dropdown">
                <button
                  className="user-chip"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="user-avatar">{firstInitial}</span>
                  <span className="user-greeting">
                    <span className="user-hello">Hi,</span>
                    <span className="user-name" title={user?.username}>
                      {user?.username}
                    </span>
                  </span>
                  <FaCaretDown className="user-caret" />
                </button>

                <ul className="dropdown-menu dropdown-menu-end user-menu">
                  <li>
                    <div className="user-menu-header">
                      <span className="user-avatar user-avatar-lg">
                        {firstInitial}
                      </span>
                      <div>
                        <div className="user-menu-name" title={user?.username}>
                          {user?.username}
                        </div>
                        {isAdmin ? (
                          <span className="badge user-badge admin">
                            <FaUserShield className="me-1" /> Admin
                          </span>
                        ) : (
                          <span className="badge user-badge customer">
                            <FaUserTie className="me-1" /> Customer
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                  <li><hr className="dropdown-divider m-0" /></li>
                  <li>
                    <button
                      className="dropdown-item user-menu-logout"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="me-2" /> Log Out
                    </button>
                  </li>
                </ul>
              </div>
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

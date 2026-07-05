import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyBookings } from "../api/BookingApi";
import { useAuth } from "../context/useAuth";

const statusColors = {
  PENDING: "warning",
  CONFIRMED: "success",
  CANCELLED: "danger",
  COMPLETED: "secondary",
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    getMyBookings()
      .then((res) => {
        if (isMounted) setBookings(res.data);
      })
      .catch((err) => {
        if (!isMounted) return;
        if (err.response?.status === 401) {
          logout();
          navigate("/login");
          return;
        }
        setError(err.response?.data?.message || "Could not load your bookings.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">My Bookings</h1>

      {loading && (
        <div className="d-flex align-items-center gap-2 text-muted">
          <span className="spinner-border spinner-border-sm" />
          Loading your bookings...
        </div>
      )}

      {!loading && error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && bookings.length === 0 && (
        <div className="alert alert-info">
          You haven't booked a tour yet.{" "}
          <a href="/booking" className="alert-link">
            Book one now
          </a>
          .
        </div>
      )}

      {!loading && bookings.length > 0 && (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0 bg-white">
            <thead className="table-light">
              <tr>
                <th>Tour Package</th>
                <th>Travel Date</th>
                <th>Guests</th>
                <th>Status</th>
                <th>Booked On</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.tourPackage}</td>
                  <td>{b.travelDate}</td>
                  <td>{b.guests}</td>
                  <td>
                    <span className={`badge bg-${statusColors[b.status] || "secondary"}`}>
                      {b.status}
                    </span>
                  </td>
                  <td>{b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;

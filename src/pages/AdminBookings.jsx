import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
} from "../api/BookingApi";
import { useAuth } from "../context/useAuth";

const STATUS_OPTIONS = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];

const statusColors = {
  PENDING: "warning",
  CONFIRMED: "success",
  CANCELLED: "danger",
  COMPLETED: "secondary",
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getAllBookings()
      .then((res) => setBookings(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          logout();
          navigate("/login");
          return;
        }
        setError(err.response?.data?.message || "Could not load bookings.");
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    try {
      const { data } = await updateBookingStatus(id, status);
      setBookings((prev) => prev.map((b) => (b.id === id ? data : b)));
    } catch (err) {
      setError(err.response?.data?.message || "Could not update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking? This cannot be undone.")) return;

    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete booking.");
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">Manage Bookings</h1>
        <span className="badge bg-dark">{bookings.length} total</span>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading && (
        <div className="d-flex align-items-center gap-2 text-muted">
          <span className="spinner-border spinner-border-sm" />
          Loading bookings...
        </div>
      )}

      {!loading && bookings.length === 0 && !error && (
        <div className="alert alert-info">No bookings yet.</div>
      )}

      {!loading && bookings.length > 0 && (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0 bg-white">
            <thead className="table-light">
              <tr>
                <th>Guest</th>
                <th>Contact</th>
                <th>Package</th>
                <th>Travel Date</th>
                <th>Guests</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.fullName}</td>
                  <td>
                    <div>{b.email}</div>
                    <div className="text-muted small">{b.phone}</div>
                  </td>
                  <td>{b.tourPackage}</td>
                  <td>{b.travelDate}</td>
                  <td>{b.guests}</td>
                  <td>
                    <select
                      className={`form-select form-select-sm border-${statusColors[b.status] || "secondary"}`}
                      value={b.status}
                      disabled={updatingId === b.id}
                      onChange={(e) => handleStatusChange(b.id, e.target.value)}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(b.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;

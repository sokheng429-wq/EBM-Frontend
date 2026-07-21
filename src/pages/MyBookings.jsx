import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyBookings } from "../api/BookingApi";
import { getLatestPayment } from "../api/PaymentApi";
import { useAuth } from "../context/useAuth";
import KhqrPaymentModal from "../components/KhqrPaymentModal";

const statusColors = {
  PENDING: "warning",
  CONFIRMED: "success",
  CANCELLED: "danger",
  COMPLETED: "secondary",
};

const paymentStatusColors = {
  PENDING: "warning",
  PAID: "success",
  EXPIRED: "secondary",
  FAILED: "danger",
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [paymentByBooking, setPaymentByBooking] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [payingBookingId, setPayingBookingId] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const loadBookings = async () => {
    try {
      const { data } = await getMyBookings();
      setBookings(data);

      // For each booking, fetch its latest payment status in parallel.
      // 404 means "no payment yet" - we just leave that booking out of the
      // payment map, which the UI treats as "can pay now".
      const results = await Promise.allSettled(
        data.map((b) => getLatestPayment(b.id))
      );
      const map = {};
      results.forEach((r, i) => {
        if (r.status === "fulfilled") {
          map[data[i].id] = r.value.data;
        }
      });
      setPaymentByBooking(map);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate("/login");
        return;
      }
      setError(err.response?.data?.message || "Could not load your bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    getMyBookings()
      .then(async (res) => {
        if (!mounted) return;
        setBookings(res.data);
        const results = await Promise.allSettled(
          res.data.map((b) => getLatestPayment(b.id))
        );
        if (!mounted) return;
        const map = {};
        results.forEach((r, i) => {
          if (r.status === "fulfilled") {
            map[res.data[i].id] = r.value.data;
          }
        });
        setPaymentByBooking(map);
      })
      .catch((err) => {
        if (!mounted) return;
        if (err.response?.status === 401) {
          logout();
          navigate("/login");
          return;
        }
        setError(err.response?.data?.message || "Could not load your bookings.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A booking can be paid through the KHQR flow if it is still PENDING and
  // hasn't already been PAID. CONFIRMED bookings are already paid.
  const canPayNow = (b) => {
    if (b.status === "CONFIRMED" || b.status === "COMPLETED") return false;
    const payment = paymentByBooking[b.id];
    if (!payment) return true;
    return payment.status !== "PAID";
  };

  const handlePaid = () => {
    setPayingBookingId(null);
    loadBookings();
  };

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
                <th>Payment</th>
                <th>Booked On</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const payment = paymentByBooking[b.id];
                return (
                  <tr key={b.id}>
                    <td>{b.tourPackage}</td>
                    <td>{b.travelDate}</td>
                    <td>{b.guests}</td>
                    <td>
                      <span className={`badge bg-${statusColors[b.status] || "secondary"}`}>
                        {b.status}
                      </span>
                    </td>
                    <td>
                      {payment ? (
                        <span className={`badge bg-${paymentStatusColors[payment.status] || "secondary"}`}>
                          {payment.status}
                        </span>
                      ) : (
                        <span className="text-muted small">Not paid yet</span>
                      )}
                    </td>
                    <td>{b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "-"}</td>
                    <td className="text-end">
                      {canPayNow(b) && (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => setPayingBookingId(b.id)}
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {payingBookingId && (
        <KhqrPaymentModal
          bookingId={payingBookingId}
          onClose={() => setPayingBookingId(null)}
          onPaid={handlePaid}
        />
      )}
    </div>
  );
};

export default MyBookings;
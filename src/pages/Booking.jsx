import { useEffect, useState } from 'react';
import { createBooking } from '../api/BookingApi';
import { getActiveTourPrices } from '../api/TourPriceApi';

const FALLBACK_TOURS = [
  'Half-Day Encounter',
  'Full-Day Trek',
  'Overnight Experience',
];

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  tourPackage: '',
  travelDate: '',
  guests: 1,
  message: '',
};

const Booking = () => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [tours, setTours] = useState([]);

  // Load tour packages from the backend so admin-created prices show up.
  // Fall back to a hardcoded list if the API is unreachable - the form
  // still works, just without any new tours the admin may have added.
  useEffect(() => {
    let mounted = true;
    getActiveTourPrices()
      .then((res) => {
        if (mounted) setTours(res.data.map((t) => t.name));
      })
      .catch(() => {
        if (mounted) setTours(FALLBACK_TOURS);
      });
    return () => { mounted = false; };
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const key = id === 'booking-name' ? 'fullName'
      : id === 'booking-email' ? 'email'
      : id === 'tour-type' ? 'tourPackage'
      : id === 'travel-date' ? 'travelDate'
      : id; // guests, phone, message already match field names

    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.fullName || !formData.email || !formData.phone || !formData.tourPackage || !formData.travelDate) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      await createBooking({
        ...formData,
        guests: Number(formData.guests),
      });
      setSuccess(true);
      setFormData(initialForm);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not send your booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <section className="container py-5">
        <div className="booking-card shadow-lg p-4 p-md-5 mx-auto">
          {/* TITLE */}
          <div className="text-center mb-4">
            <h1 className="fw-bold">Book Your Trip</h1>
            <p className="text-muted mb-0">
              Choose your elephant experience and send us your travel details.
            </p>
          </div>

          {success && (
            <div className="alert alert-success text-center">
              Thanks! Your booking request has been received. We'll be in touch shortly.
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          {/* BOOKING FORM */}
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label className="form-label" htmlFor="booking-name">
                Full Name
              </label>
              <input
                id="booking-name"
                type="text"
                className="form-control"
                placeholder="Your name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="booking-email">
                Email
              </label>
              <input
                id="booking-email"
                type="email"
                className="form-control"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="tour-type">
                Tour Package
              </label>
              <select
                id="tour-type"
                className="form-select"
                value={formData.tourPackage}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a tour
                </option>
                {tours.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="travel-date">
                Travel Date
              </label>
              <input
                id="travel-date"
                type="date"
                className="form-control"
                value={formData.travelDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="guests">
                Guests
              </label>
              <input
                id="guests"
                type="number"
                min="1"
                className="form-control"
                placeholder="Number of guests"
                value={formData.guests}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                className="form-control"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="form-control"
                rows="4"
                placeholder="Tell us anything we should know"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-success btn-lg w-100" disabled={loading}>
                {loading ? 'Sending...' : 'Send Booking Request'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Booking;

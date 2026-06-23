const Booking = () => {
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

          {/* BOOKING FORM */}
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label" htmlFor="booking-name">
                Full Name
              </label>
              <input
                id="booking-name"
                type="text"
                className="form-control"
                placeholder="Your name"
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
              />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="tour-type">
                Tour Package
              </label>
              <select id="tour-type" className="form-select" defaultValue="">
                <option value="" disabled>
                  Select a tour
                </option>
                <option>Half-Day Encounter</option>
                <option>Full-Day Trek</option>
                <option>Overnight Experience</option>
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
              ></textarea>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-success btn-lg w-100">
                Send Booking Request
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Booking;

import { Link } from 'react-router-dom';
import aboutImage from '../assets/4.jpg';
import Footer from '../components/Footer';

const Aboutus = () => {
  return (
    <div>
      {/* HERO */}
      <section className="about-hero d-flex align-items-center text-white text-center">
        <div className="container hero-content">
          <h1 className="display-3 fw-bold">About EBM Tours</h1>
          <p className="lead mt-3">
            Ethical elephant tourism in Mondulkiri, Cambodia
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">Who We Are</h2>

            <p>
              EBM, Elephant Booking Mondulkiri, is a responsible tourism platform
              focused on protecting elephants and supporting the Bunong community.
            </p>

            <p>
              We promote ethical wildlife experiences with no riding and no exploitation.
              Guests can enjoy natural activities like river bathing, jungle trekking,
              and elephant observation.
            </p>

            <p>
              Our goal is to connect travelers with nature while helping protect
              Mondulkiri forests, elephants, and local culture.
            </p>
          </div>

          <div className="col-md-6 text-center">
            <img
              src={aboutImage}
              alt="Elephant in Mondulkiri forest"
              className="img-fluid rounded shadow about-img"
            />
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="about-values py-5 text-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-5">Our Core Values</h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="value-card p-4 rounded shadow h-100">
                <h4>Ethical Tourism</h4>
                <p>No riding, only respect and natural connection.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="value-card p-4 rounded shadow h-100">
                <h4>Conservation</h4>
                <p>Protecting elephants and forest ecosystems.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="value-card p-4 rounded shadow h-100">
                <h4>Community</h4>
                <p>Supporting Bunong families with sustainable income.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="container text-center py-5">
        <h2 className="fw-bold">Ready for an Elephant Adventure?</h2>
        <p className="mt-2">
          Experience Mondulkiri nature in the most ethical way.
        </p>

        <Link to="/booking" className="btn btn-success btn-lg mt-3">
          Book Your Trip
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default Aboutus;

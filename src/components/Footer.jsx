
const Footer = () => {
  return (
    <footer className="ebm-footer text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">Contact Us</h5>

            <p>
              <i className="fas fa-phone-alt me-2"></i>
              <a className="footer-link" href="tel:+85512345678">
                +855 12 345 678
              </a>
            </p>

            <p>
              <i className="fab fa-telegram me-2"></i>
              <a
                className="footer-link"
                href="https://t.me/yourusername"
                target="_blank"
                rel="noreferrer"
              >
                Telegram
              </a>
            </p>
          </div>

          <div className="col-md-4 text-center">
            <h4 className="fw-bold">Mondulkiri Tours</h4>
            <p className="small mt-3">
              Experience elephants, jungle trekking, and authentic Khmer nature adventures.
            </p>
          </div>

          <div className="col-md-4 text-md-end">
            <h5 className="fw-bold mb-3">Follow Us</h5>

            <p>
              <a
                className="footer-link"
                href="https://www.facebook.com/mondulkiriproject/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-facebook me-2"></i> Facebook
              </a>
            </p>

            <p>
              <a
                className="footer-link"
                href="https://www.tripadvisor.com/Tourism-g2366669-Mondulkiri_Province-Vacations.html"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-tripadvisor me-2"></i> TripAdvisor
              </a>
            </p>
          </div>
        </div>

        <hr className="footer-line my-4" />

        <div className="text-center small">
          Copyright 2026 Mondulkiri Elephant Sanctuary | Sen Monorom, Cambodia
        </div>
      </div>
    </footer>
  );
};

export default Footer;

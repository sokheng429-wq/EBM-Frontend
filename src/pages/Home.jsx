import hero1 from '../assets/1.jpg';
import hero2 from '../assets/2.jpg';
import hero3 from '../assets/3.png';
import hero4 from '../assets/4.jpg';
import hero5 from '../assets/5.webp';
import hero6 from '../assets/6.webp';

import washImg from '../assets/Elephantwashing.jpg';
import trekImg from '../assets/Jungle Trekking.webp';
import campImg from '../assets/cmap.avif';

import op1 from '../assets/op1.jpg';
import op2 from '../assets/op2.jpg';
import op3 from '../assets/op3.jpg';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <section id="home" className="position-relative text-white hero-section">
        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {[hero1, hero2, hero3, hero4, hero5, hero6].map((img, index) => (
              <div
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                key={img}
              >
                <img
                  src={img}
                  className="d-block w-100 hero-img"
                  alt="Mondulkiri elephant tour"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="hero-dark-overlay"></div>

        <div className="hero-overlay text-center text-white">
          <h1 className="hero-title">Experience the Magic of Mondulkiri</h1>

          <p className="hero-subtitle">
            Discover elephants, jungle trekking, waterfalls, and authentic Bunong culture.
          </p>

          <div className="mt-4">
            <a href="#tours" className="btn btn-warning btn-lg me-2">
              Explore Tours
            </a>

            <a href="/booking" className="btn btn-success btn-lg">
              Book Now
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="container py-5">
        <h2 className="text-center mb-5 fw-bold">Adventure Highlights</h2>

        <div className="row g-4">
          {[
            { img: washImg, title: 'River Bathing', desc: 'Wash elephants in natural river.' },
            { img: trekImg, title: 'Jungle Trekking', desc: 'Walk deep into the forest.' },
            { img: campImg, title: 'Jungle Camping', desc: 'Sleep under the stars in nature.' },
          ].map((item) => (
            <div className="col-md-4" key={item.title}>
              <div className="card shadow h-100 highlight-card">
                <img src={item.img} className="card-img-top uniform-img" alt={item.title} />
                <div className="card-body text-center">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="tours" className="container py-5">
        <h2 className="text-center mb-5 fw-bold">Choose Your Adventure</h2>

        <div className="row g-4">
          {[
            { img: op1, title: 'Half-Day Encounter', price: '$45', desc: 'Feed and walk with elephants.' },
            { img: op2, title: 'Full-Day Trek', price: '$75', desc: 'Waterfall + jungle trekking.' },
            { img: op3, title: 'Overnight Experience', price: '$120', desc: 'Sleep in forest huts.' },
          ].map((tour) => (
            <div className="col-md-4" key={tour.title}>
              <div className="card shadow h-100 tour-card">
                <img src={tour.img} className="card-img-top uniform-img" alt={tour.title} />

                <div className="card-body text-center">
                  <h3>{tour.title}</h3>
                  <h5 className="text-success fw-bold">{tour.price}</h5>
                  <p>{tour.desc}</p>

                  <a href="/booking" className="btn btn-success w-100">
                    Select Tour
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;

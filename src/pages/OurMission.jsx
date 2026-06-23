import missionImage from '../assets/3.png';

const OurMission = () => {
  return (
    <div>
        
      {/* HERO SECTION */}
      <section className="mission-hero text-white text-center d-flex align-items-center">
        <div className="container">
          <h1 className="display-4 fw-bold">
            Our Mission & Heart 🐘
          </h1>
          <p className="lead mt-3">
            Protecting elephants and preserving Mondulkiri nature & culture
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="container py-5">
        <div className="row align-items-center g-5">

          {/* TEXT */}
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">A Sanctuary for Life</h2>

            <p>
              Founded in Mondulkiri, our sanctuary is a retirement home for elephants
              rescued from logging and tourism industries. No riding — only respect.
            </p>

            <p>
              Visitors help wash elephants in the river, walk with them in the jungle,
              and learn ethical wildlife tourism.
            </p>

            {/* STATS */}
            <div className="row mt-4 text-center">

              <div className="col-6">
                <div className="p-3 shadow rounded stat-box">
                  <h3 className="text-success fw-bold">10+</h3>
                  <p className="mb-0">Elephants Protected</p>
                </div>
              </div>

              <div className="col-6">
                <div className="p-3 shadow rounded stat-box">
                  <h3 className="text-success fw-bold">100%</h3>
                  <p className="mb-0">Bunong Staff</p>
                </div>
              </div>

            </div>
          </div>

          {/* IMAGE */}
          <div className="col-md-6 text-center">
            <img
              src={missionImage}
              className="img-fluid rounded shadow mission-img"
              alt="Elephant in river"
            />
          </div>

        </div>
      </section>

      {/* COMMUNITY SECTION */}
      <section className="community-section text-white text-center py-5">
        <div className="container">

          <div className="community-box p-5 rounded shadow-lg">

            <h2 className="fw-bold mb-3">
              🌿 Supporting the Bunong People
            </h2>

            <p className="lead">
              Your visit directly supports the indigenous Bunong community by creating
              sustainable jobs and preserving forest culture for future generations.
            </p>

          </div>

        </div>
      </section>

    </div>
  );
};

export default OurMission;

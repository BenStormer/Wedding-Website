import './Home.css';

const Home = () => {
  return (
    <div className="body">
      <LandingImage />
      <OverviewDetails />
      <div className="rsvp"></div>
      <div className="other-page-nudges"></div>
      <div className="our-story"></div>
      <div className="menu"></div>
    </div>
  );
};

const LandingImage = () => {
  return (
    <div className="engagement-photo-container">
      <div className="engagement-photo"></div>
      <div className="countdown">In {getDaysUntil()} days...</div>
    </div>
  );
};

function getDaysUntil(): number {
  const weddingDate = new Date('2026-10-11');
  const now = new Date();
  const timeDifference = weddingDate.getTime() - now.getTime();
  const daysUntil = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return daysUntil;
}

const OverviewDetails = () => {
  return (
    <div className="overview-details">
      <h1>Celebrate the wedding of Aspen and Benjamin!</h1>
      <div className="overview-detail-panels"></div>
    </div>
  );
};

export default Home;

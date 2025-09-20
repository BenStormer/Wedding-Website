import './Home.css';

const Home = () => {
  return (
    <div className="body">
      <div className="engagement-photo"></div>
      <OverviewDetails />
      <div className="rsvp"></div>
      <div className="other-page-nudges"></div>
      <div className="our-story"></div>
      <div className="menu"></div>
    </div>
  );
};

const OverviewDetails = () => {
  return (
    <div className="overview-details">
      <h1>Celebrate the wedding of Aspen and Benjamin!</h1>
    </div>
  );
};

export default Home;

import './Home.css';
import OverviewDetailBoxContainer from '../components/OverviewDetailBoxes';
import RsvpBox from '../components/RsvpBox';

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
      <h1>Celebrate the wedding of Aspen and Ben!</h1>
      <div>
        {OverviewDetailBoxContainer([
          {
            label: 'When',
            details: 'October 11, 2026',
          },
          {
            label: 'Where',
            details: 'Noah Liff Opera Center',
          },
          {
            label: 'Attire',
            details: 'Semi-formal',
          },
        ])}
      </div>
    </div>
  );
};

const Rsvp = () => {
  return (
    <div className="rsvp-section-container">
      <>{RsvpBox()}</>
      /* Needs to allow user to put Firstname, Lastname, email (optionally) and
      YES/NO */
    </div>
  );
};

const Home = () => {
  return (
    <div className="body">
      <LandingImage />
      <OverviewDetails />
      <Rsvp />
      <div className="other-page-nudges"></div>
      <div className="our-story"></div>
      <div className="menu"></div>
    </div>
  );
};
export default Home;

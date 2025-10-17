import './Home.css';

// Components
import OverviewDetailBoxContainer from '../components/OverviewDetailBoxes';
import RsvpBox from '../components/RsvpBox';
import PageDetailCardContainer from '../components/PageDetailCards';

// Assets
import parthenonSitting from '../assets/images/parthenon_sitting.jpg';

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
    <div className="rsvp">
      <>{RsvpBox()}</>
    </div>
  );
};

const OtherPageLinks = () => {
  return (
    <div className="other-page-links">
      Want to know more? See the sections below!
      <>
        {PageDetailCardContainer([
          {
            label: 'Wedding Details',
            details: 'See what you need to know before attending!',
            image: parthenonSitting,
          },
          {
            label: 'Visiting Nashville',
            details: 'Things to know and sights to see in Music City!',
            image: parthenonSitting,
          },
          {
            label: 'Registry',
            details: 'Want to send a gift our way? Here are some ideas',
            image: parthenonSitting,
          },
          {
            label: 'Frequently Asked Questions',
            details: 'Confused about something? Check our FAQ!',
            image: parthenonSitting,
          },
        ])}
      </>
    </div>
  );
};

const Home = () => {
  return (
    <div className="body">
      <LandingImage />
      <OverviewDetails />
      <Rsvp />
      <OtherPageLinks />
      <div className="other-page-links"></div>
      <div className="our-story"></div>
      <div className="menu"></div>
    </div>
  );
};

export default Home;

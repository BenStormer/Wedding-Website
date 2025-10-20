import './Home.css';

// Components
import OverviewDetailBoxContainer from '../components/home/OverviewDetailBoxes';
import RsvpBox from '../components/home/RsvpBox';
import PageDetailCardContainer from '../components/home/PageDetailCards';
import Menu from '../components/common/Menu';

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
            alt: 'An elegantly decorated wedding venue',
            link: '/details',
          },
          {
            label: 'Visiting Nashville',
            details: 'Things to know and sights to see in Music City!',
            image: parthenonSitting,
            alt: 'The Nashville skyline at night',
            link: '/visiting-nashville',
          },
          {
            label: 'Registry',
            details: 'Want to send a gift our way? Here are some ideas',
            image: parthenonSitting,
            alt: 'A decorative gift box',
            link: '/registry',
          },
          {
            label: 'Frequently Asked Questions',
            details: 'Confused about something? Check our FAQ!',
            image: parthenonSitting,
            alt: 'An individual looking confused',
            link: '/faqs',
          },
        ])}
      </>
    </div>
  );
};

const OurStory = () => {
  return (
    <div className="our-story-container">
      <h1>Our Story</h1>
      <div className="our-story">Use different photo for mobile + desktop</div>
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
      <OurStory />
      <Menu />
    </div>
  );
};

export default Home;

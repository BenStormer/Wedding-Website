import './Home.css';

// Components
import OverviewDetailBoxContainer from '../components/home/OverviewDetailBoxes';
import RsvpBox from '../components/home/RsvpBox';
import PageDetailCardContainer from '../components/home/PageDetailCards';
import Menu from '../components/common/Menu';

// Assets
import ragsdaleLobby from '../assets/images/ragsdale_ceremony_setup.webp';
import nashvilleSkyline from '../assets/images/nashville_skyline.webp';
import registryGifts from '../assets/images/registry_gifts.webp';
import questionCards from '../assets/images/question_cards.webp';
import ourStoryHorizontal from '../assets/images/our_story_horizontal.svg';
import ourStoryVertical from '../assets/images/our_story_vertical.svg';

const LandingImage = () => {
  return (
    <div className="engagement-photo-container">
      <div className="engagement-photo"></div>
      <div className="countdown">In {getDaysUntil()} days...</div>
      <div className="hero-title">Celebrate the wedding of Aspen and Ben!</div>
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
      <OverviewDetailBoxContainer
        detailBoxes={[
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
        ]}
      />
    </div>
  );
};

const Rsvp = () => {
  return (
    <div className="rsvp">
      <RsvpBox />
    </div>
  );
};

const OurStory = () => {
  return (
    <div className="our-story">
      <h2 className="section-heading">Our Story</h2>
      <div className="story-timeline-container">
        <img
          src={ourStoryHorizontal}
          alt="Timeline of our relationship - desktop view"
          className="story-timeline-desktop"
        />
        <img
          src={ourStoryVertical}
          alt="Timeline of our relationship - mobile view"
          className="story-timeline-mobile"
        />
      </div>
    </div>
  );
};

const OtherPageLinks = () => {
  return (
    <div className="other-page-links">
      <h2 className="section-heading">
        Want to know more? Click one of the sections below!
      </h2>
      <PageDetailCardContainer
        pageDetailCards={[
          {
            label: 'Wedding Details',
            details: 'See what you need to know before attending!',
            image: ragsdaleLobby,
            alt: 'The Ragsdale Lobby room of the Noah Liff Opera Center decorated for a wedding ceremony',
            link: '/details',
            imagePosition: 'left 43%',
          },
          {
            label: 'Visiting Nashville',
            details: 'Things to know and sights to see in Music City!',
            image: nashvilleSkyline,
            alt: 'The Nashville skyline at night',
            link: '/visiting-nashville',
          },
          {
            label: 'Registry',
            details: 'Want to send a gift our way? Here are some ideas!',
            image: registryGifts,
            alt: 'A set of decorative gift boxes',
            link: '/registry',
            imagePosition: 'left 25%',
          },
          {
            label: 'Frequently Asked Questions',
            details: 'Confused about something? Check our FAQ!',
            image: questionCards,
            alt: 'Cards displayed on a table with question marks on them',
            link: '/faqs',
            imagePosition: 'center top',
          },
        ]}
      />
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
      {Menu('Home', 'brown')}
    </div>
  );
};

export default Home;

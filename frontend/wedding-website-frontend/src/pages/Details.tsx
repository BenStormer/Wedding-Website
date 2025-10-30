import './Details.css';

// Components
import CustomTimeline from '../components/details/Timeline';
import VenueInfo from '../components/details/VenueInfo';
import Menu from '../components/common/Menu';

// Assets
import parthenonSitting from '../assets/images/parthenon_sitting.jpg';

const WeddingTimeline = () => {
  return (
    <div className="timeline-container">
      {CustomTimeline([
        {
          title: 'Ceremony',
          time: '3pm',
          details:
            'The ceremony will be held at the Noah Liff Opera Center at 3:00pm CST!',
        },
        {
          title: 'Cocktail Hour',
          time: '4pm',
          details:
            'Snacks and drinks will be provided for a cocktail hour while the room flip occurs.',
        },
        {
          title: 'Reception',
          time: '5pm',
          details:
            'The wedding reception will occur after a room flip and end at 10:00pm CST! ',
        },
        {
          title: 'Reception Ends',
          time: '10pm',
          details:
            'The reception will end and all guests must leave the venue at 10:00PM CST.',
        },
      ])}
    </div>
  );
};

const WeddingVenueDetails = () => {
  return (
    <div className="venue-details-container">
      {VenueInfo({
        card: {
          venueName: 'The Noah Liff Opera Center',
          venueDetails: `The Noah Liff Opera Center has lots of details that should go here.
        Lets do a new paragraph too. And a few more fun details.`,
          image: parthenonSitting,
          alt: 'An exterior view of the Noah Liff Opera Center',
          link: 'https://www.google.com/maps/dir//The+Noah+Liff+Opera+Center,+3622+Redmon+St,+Nashville,+TN+37209/data=!4m7!4m6!1m1!4e2!1m2!1m1!1s0x886461520ba83813:0xed31943604954551!3e0?sa=X&ved=1t:3747&ictx=111',
        },
        details: {
          details: 'hey there',
        },
      })}
    </div>
  );
};

const Details = () => {
  return (
    <div className="body">
      <WeddingTimeline />
      <WeddingVenueDetails />
      <div className="faqs?" />
      {Menu('Details')}
    </div>
  );
};

export default Details;

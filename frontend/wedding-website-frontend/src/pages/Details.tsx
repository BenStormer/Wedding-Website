import './Details.css';

// Components
import CustomTimeline from '../components/details/Timeline';
import type { TimelineEvent } from '../components/details/Timeline';
import VenueInfo from '../components/details/VenueInfo';
import Menu from '../components/common/Menu';

// Assets
import parthenonSitting from '../assets/images/parthenon_sitting.jpg';

const weddingEvents: TimelineEvent[] = [
  {
    title: 'Ceremony',
    time: '4:00 PM',
    description:
      'Join us as we say "I do"! The ceremony will be held at the beautiful Noah Liff Opera Center. Please arrive 15-20 minutes early to find your seats.',
  },
  {
    title: 'Cocktail Hour',
    time: '5:00 PM',
    description:
      "Enjoy drinks and hors d'oeuvres while we take photos and the room is transformed for the reception. Mingle with friends and family!",
  },
  {
    title: 'Reception',
    time: '5:00 PM',
    description:
      'Let the celebration begin! Join us for dinner, dancing, and an unforgettable evening celebrating our love story.',
  },
  {
    title: 'Last Call',
    time: '9:00 PM',
    description:
      'All good things must come to an end! The reception will wrap up at 10:00 PM. Thank you for celebrating with us!',
  },
];

const WeddingTimeline = () => {
  return (
    <div className="timeline-container">
      <CustomTimeline events={weddingEvents} title="Wedding Day Schedule" />
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
      {Menu('Details')}
    </div>
  );
};

export default Details;

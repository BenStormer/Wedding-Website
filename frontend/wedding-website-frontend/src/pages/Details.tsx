import './Details.css';

// Components
import CustomTimeline from '../components/details/Timeline';
import Menu from '../components/common/Menu';

// Assets

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

const Details = () => {
  return (
    <div className="body">
      <WeddingTimeline />
      <div className="venue-details" />
      <div className="faqs?" />
      {Menu('Details')}
    </div>
  );
};

export default Details;

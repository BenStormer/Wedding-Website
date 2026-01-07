import './Details.css';

// Components
import CustomTimeline from '../components/details/Timeline';
import type { TimelineEvent } from '../components/details/Timeline';
import VenueInfo from '../components/details/VenueInfo';
import Menu from '../components/common/Menu';
import TopNav from '../components/common/TopNav';

// Mantine
import { Box, Text, Stack, Center } from '@mantine/core';
import { IconCalendarHeart } from '@tabler/icons-react';

// Assets
import noahLiffOperaCenter from '../assets/images/noah_liff_frontview.webp';

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
    time: '6:00 PM',
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
      <CustomTimeline events={weddingEvents} />
    </div>
  );
};

const WeddingVenueDetails = () => {
  return (
    <div className="venue-details-container">
      <h2 className="section-heading">The Venue</h2>
      <VenueInfo
        venueName="The Noah Liff Opera Center"
        venueDetails="The Noah Liff Opera Center is home to Nashville Opera and shares space with the Nashville Ballet. It's in Sylvan Park, a quiet neighborhood just west of Midtown and about 15 minutes from downtown."
        image={noahLiffOperaCenter}
        alt="An exterior view of the Noah Liff Opera Center"
        directionsLink="https://www.google.com/maps/dir//The+Noah+Liff+Opera+Center,+3622+Redmon+St,+Nashville,+TN+37209"
        websiteLink="https://noahliffoperacenter.org/about-us"
      />
    </div>
  );
};

const Details = () => {
  return (
    <div className="body">
      <TopNav currentPage="Details" theme="green" />
      <Box className="details-page">
        <Box className="details-header">
          <Stack gap="sm" align="center">
            <Center>
              <IconCalendarHeart
                size={36}
                stroke={1.5}
                className="details-header-icon"
              />
            </Center>
            <Text className="details-header-title">Wedding Details</Text>
            <Text className="details-header-subtitle">
              Everything you need to know about our special day!
            </Text>
          </Stack>
        </Box>
        <WeddingTimeline />
        <WeddingVenueDetails />
      </Box>
      {Menu('Details', 'green')}
    </div>
  );
};

export default Details;

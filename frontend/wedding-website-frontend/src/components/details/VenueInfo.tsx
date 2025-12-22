import './VenueInfo.css';

import {
  Card,
  Center,
  Image,
  Text,
  Button,
  Anchor,
  Group,
  Box,
  SimpleGrid,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import {
  IconHanger,
  IconCar,
  IconCalendarEvent,
  IconCamera,
  IconGlass,
} from '@tabler/icons-react';

interface VenueInfoProps {
  venueName: string;
  venueDetails: string;
  image: string;
  alt: string;
  directionsLink: string;
  websiteLink: string;
}

const VenueOverviewCard = (props: VenueInfoProps) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="venue-card"
    >
      <Card.Section>
        <Image
          radius="xs"
          src={props.image}
          alt={props.alt}
          height={400}
          fit="cover"
        />
      </Card.Section>

      <Center>
        <Text
          size="lg"
          fw={500}
          c="dark.7"
          mt="md"
          mb="sm"
          className="venue-name"
        >
          {props.venueName}
        </Text>
      </Center>

      <Text size="sm" fw={300} c="dark.6" mb="md">
        {props.venueDetails}
      </Text>

      <Group grow>
        <Button
          variant="light"
          color="var(--primary-green)"
          radius="md"
          component="a"
          href={props.websiteLink}
          target="_blank"
          className="venue-button"
        >
          Website
        </Button>
        <Button
          variant="light"
          color="var(--primary-green)"
          radius="md"
          component={Link}
          to={props.directionsLink}
          className="venue-button"
        >
          Directions
        </Button>
      </Group>
    </Card>
  );
};

const detailItems = [
  {
    icon: IconHanger,
    title: 'Attire',
    description:
      'Semi-formal attire is requested. Please dress comfortably but elegantly for the celebration.',
  },
  {
    icon: IconCar,
    title: 'Parking',
    description:
      'Plentiful free parking is available on-site, but we still encourage you to carpool if possible!',
  },
  {
    icon: IconCalendarEvent,
    title: 'What to Expect',
    description:
      'The ceremony and reception will both be held at the venue. Dinner and drinks will be provided.',
  },
  {
    icon: IconCamera,
    title: 'Photos & Phones',
    description:
      "We kindly ask that you keep phones and cameras away during the ceremony so everyone can be fully present. After that, snap away! We'd love to see your photos from the rest of the celebration.",
  },
  {
    icon: IconGlass,
    title: 'Drinks',
    description:
      'Alcohol will be served at the cocktail hour and reception, please plan your transportation accordingly.',
  },
];

const VenueDetailsInfo = () => {
  return (
    <Box className="venue-details-section">
      <Text
        ta="center"
        fz={{ base: 'lg', sm: 'xl' }}
        fw={400}
        c="black"
        mb="lg"
        style={{ letterSpacing: '0.02em' }}
      >
        Important Details
      </Text>
      <SimpleGrid cols={1} spacing="lg" className="venue-details-grid">
        {detailItems.map((item) => (
          <Box key={item.title} className="venue-detail-card">
            <item.icon stroke={1.5} className="venue-detail-icon" />
            <Box>
              <Text fw={600} size="md" mb={4}>
                {item.title}
              </Text>
              <Text size="sm" c="dark.6" lh={1.5}>
                {item.description}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

const VenueAdditionalInfo = () => {
  return (
    <div className="venue-faq-link">
      <Anchor fw={700} c="var(--primary-green)" href="/faqs">
        Need more details? See the Frequently Asked Questions
      </Anchor>
    </div>
  );
};

const VenueInfo = (props: VenueInfoProps) => {
  return (
    <div className="venue-info-wrapper">
      <VenueOverviewCard {...props} />
      <VenueDetailsInfo />
      <VenueAdditionalInfo />
    </div>
  );
};

export default VenueInfo;

import './VenueInfo.css';

import {
  Card,
  Center,
  Image,
  Text,
  Button,
  Group,
  Box,
  SimpleGrid,
} from '@mantine/core';
import {
  IconHanger,
  IconCar,
  IconCalendarEvent,
  IconCamera,
  IconGlass,
  IconMapPin,
  IconExternalLink,
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
          c="var(--bold-green)"
          mt="md"
          mb="sm"
          className="venue-name"
        >
          {props.venueName}
        </Text>
      </Center>

      <Text size="sm" fw={300} c="var(--bold-green)" mb="md" className="venue-details-text">
        {props.venueDetails}
      </Text>

      <Group grow>
        <Button
          variant="light"
          color="var(--primary-green)"
          radius="md"
          component="a"
          href={props.directionsLink}
          target="_blank"
          leftSection={<IconMapPin size={16} />}
          className="venue-button"
        >
          Directions
        </Button>
        <Button
          variant="light"
          color="var(--primary-green)"
          radius="md"
          component="a"
          href={props.websiteLink}
          target="_blank"
          leftSection={<IconExternalLink size={16} />}
          className="venue-button"
        >
          Website
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
        c="var(--bold-green)"
        mb="lg"
        style={{ letterSpacing: '0.02em' }}
        className="venue-details-title"
      >
        Important Details
      </Text>
      <SimpleGrid cols={1} spacing="lg" className="venue-details-grid">
        {detailItems.map((item) => (
          <Box key={item.title} className="venue-detail-card">
            <item.icon stroke={1.5} className="venue-detail-icon" />
            <Box>
              <Text fw={600} size="md" mb={4} c="var(--secondary-green)" className="venue-detail-title">
                {item.title}
              </Text>
              <Text size="sm" c="var(--secondary-green)" lh={1.5} className="venue-detail-description">
                {item.description}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

const VenueInfo = (props: VenueInfoProps) => {
  return (
    <div className="venue-info-wrapper">
      <VenueOverviewCard {...props} />
      <VenueDetailsInfo />
    </div>
  );
};

export default VenueInfo;

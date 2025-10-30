import './VenueInfo.css';

import {
  Card,
  Center,
  Image,
  Text,
  Button,
  Space,
  Anchor,
} from '@mantine/core';
import { Link } from 'react-router-dom';

type VenueOverviewCardType = {
  venueName: string;
  venueDetails: string;
  image: string;
  alt: string;
  link: string;
};

type VenueDetailsType = {
  details: string;
};

type VenueInfo = {
  card: VenueOverviewCardType;
  details: VenueDetailsType;
};

const VenueOverviewCard = (card: VenueOverviewCardType) => {
  return (
    <Card shadow="lg" padding="md" radius="md" withBorder>
      <Card.Section>
        <Image radius="xs" src={card.image} alt={card.alt} />
      </Card.Section>

      <Center>
        <Text mt="md" mb="xs" fw={700}>
          {card.venueName}
        </Text>
      </Center>

      <Text size="sm" c="black" mt="xs" mb="xs">
        {card.venueDetails}
      </Text>

      <Button
        color="var(--primary-green)"
        fullWidth
        mt="md"
        radius="md"
        component={Link}
        to={card.link}
      >
        Directions
      </Button>
    </Card>
  );
};

const VenueDetails = () => {
  // Details about attire, parking, and anything else that would concern attendees here
  return (
    <div>
      <Text>
        Details about attire, parking, and anything else that would concern
        attendees here
      </Text>

      <Space h="md" />

      <Anchor fw={700} c="var(--primary-green)" href="../faqs" target="_blank">
        Need more details? See the Frequently Asked Questions
      </Anchor>
    </div>
  );
};

const VenueInfo = (info: VenueInfo) => {
  return (
    <div>
      {VenueOverviewCard(info.card)}
      <Space h="md" />
      {VenueDetails()}
    </div>
  );
};

export default VenueInfo;

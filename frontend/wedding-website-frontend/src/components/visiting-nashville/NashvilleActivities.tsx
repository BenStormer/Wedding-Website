import './NashvilleActivites.css';
import classes from './NashvilleActivites.module.css';
import parthenonSitting from '../../assets/images/parthenon_sitting.jpg';

import {
  SimpleGrid,
  Card,
  Image,
  Button,
  FloatingIndicator,
  Tabs,
  Text,
  Center,
  Space,
  Box,
} from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type NashvilleActivityCardType = {
  label: string;
  details: string;
  image: string;
  alt: string;
  location: string;
  cost: number;
  website: string;
};

const NashvilleActivityCard = (card: NashvilleActivityCardType) => {
  return (
    <Card shadow="md" padding="md" radius="md" withBorder>
      <Card.Section>
        <Image radius="xs" src={card.image} alt={card.alt} />
      </Card.Section>

      <Card.Section>
        <Center>
          <Text mt="md" mb="xs" fw={700}>
            {card.label}
          </Text>

          <Space w="md" />

          <Text c="black" mt="md" mb="xs" fw={700}>
            Cost:{' '}
          </Text>

          <Text c="black" mt="md" mb="xs" fw={400}>
            {card.cost !== 0
              ? '$'.repeat(Math.max(1, Math.min(5, card.cost)))
              : 'Free'}
          </Text>
        </Center>
      </Card.Section>

      <Text size="sm" c="black" mt="xs" mb="xs">
        {card.details}
      </Text>

      <Card.Section>
        <Button
          color="var(--primary-green)"
          fullWidth
          mt="md"
          radius="md"
          component={Link}
          to={card.location}
        >
          Directions
        </Button>

        <Button
          color="var(--primary-green)"
          fullWidth
          mt="md"
          radius="md"
          component={Link}
          to={card.website}
        >
          Website
        </Button>
      </Card.Section>
    </Card>
  );
};

const ActivityCardContainer = (cards: Array<NashvilleActivityCardType>) => {
  return (
    <Box p="lg">
      <SimpleGrid spacing="lg">
        {cards.map((card, _index) => NashvilleActivityCard(card))}
      </SimpleGrid>
    </Box>
  );
};

const NashvilleActivitiesTabs = () => {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>('1');
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <Center>
      <Tabs variant="none" value={value} onChange={setValue}>
        <Tabs.List ref={setRootRef} className={classes.list}>
          <Tabs.Tab
            value="places-to-stay"
            ref={setControlRef('1')}
            className={classes.tab}
          >
            Places to Stay
          </Tabs.Tab>
          <Tabs.Tab value="2" ref={setControlRef('2')} className={classes.tab}>
            Places to See
          </Tabs.Tab>
          <Tabs.Tab value="3" ref={setControlRef('3')} className={classes.tab}>
            Places to Eat
          </Tabs.Tab>

          <FloatingIndicator
            target={value ? controlsRefs[value] : null}
            parent={rootRef}
            className={classes.indicator}
          />
        </Tabs.List>

        <Tabs.Panel value="places-to-stay">
          {ActivityCardContainer([
            {
              label: "Ben's House",
              details: 'It is really cool',
              image: parthenonSitting,
              alt: 'Bens crib',
              location: 'link here',
              cost: 0,
              website: 'link here',
            },
            {
              label: "Aspen's House",
              details: "Just like Ben's, but pricier",
              image: parthenonSitting,
              alt: 'Bens crib',
              location: 'link here',
              cost: 3,
              website: 'link here',
            },
          ])}
        </Tabs.Panel>
        <Tabs.Panel value="2">Places to See</Tabs.Panel>
        <Tabs.Panel value="3">Places to Eat</Tabs.Panel>
      </Tabs>
    </Center>
  );
};

export default NashvilleActivitiesTabs;

import './NashvilleActivites.css';
import classes from './NashvilleActivites.module.css';
import { data } from './places';

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
    <Card id={card.label} shadow="md" padding="md" radius="md" withBorder>
      <Card.Section>
        <Image radius="xs" src={card.image} alt={card.alt} />
      </Card.Section>

      <Card.Section>
        <Center>
          <Text mt="md" mb="xs" fw={700}>
            {card.label}
          </Text>
          <Space w="md" />

          {/* Must be in box to preserve whitespace*/}
          <Box component="pre">
            <Text c="black" mt="md" mb="xs" fw={700}>
              Cost:{' '}
            </Text>
          </Box>

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
        {cards.map((card, _index) => (
          <NashvilleActivityCard key={card.label} {...card} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

const NashvilleActivitiesTabs = () => {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>('places-to-stay');
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
          <Tabs.Tab
            value="places-to-see"
            ref={setControlRef('2')}
            className={classes.tab}
          >
            Places to See
          </Tabs.Tab>
          <Tabs.Tab
            value="places-to-eat"
            ref={setControlRef('3')}
            className={classes.tab}
          >
            Places to Eat
          </Tabs.Tab>

          <FloatingIndicator
            target={value ? controlsRefs[value] : null}
            parent={rootRef}
            className={classes.indicator}
          />
        </Tabs.List>

        <Tabs.Panel value="places-to-stay">
          {ActivityCardContainer(data['places-to-stay'])}
        </Tabs.Panel>

        <Tabs.Panel value="places-to-see">
          {ActivityCardContainer(data['places-to-see'])}
        </Tabs.Panel>

        <Tabs.Panel value="places-to-eat">
          {ActivityCardContainer(data['places-to-eat'])}
        </Tabs.Panel>
      </Tabs>
    </Center>
  );
};

export default NashvilleActivitiesTabs;

import './RegistryItems.css';
import { mockData } from './gifts'; // TODO: Remove this and use real DB

import {
  Box,
  Badge,
  Card,
  Center,
  Grid,
  Progress,
  Space,
  Text,
  Paper,
} from '@mantine/core';

type RegistryItem = {
  label: string;
  description: string;
  price: number;
  image?: string;
  alt?: string;
  requested_quantity: number;
  received_quantity: number;
  purchase_link: string;
};

const ItemCard = (item: RegistryItem) => {
  return (
    <Card key={item.label} shadow="sm" padding="md" radius="md" withBorder>
      {/* Label and price */}
      <Card.Section inheritPadding>
        <Grid justify="space-between" pt="lg" pl="md">
          <Text fw={700}>{item.label}</Text>
          <Badge color="var(--secondary-green)">${item.price}</Badge>
        </Grid>
      </Card.Section>

      {/* Description */}
      <Card.Section inheritPadding>
        <Space h="sm" />
        <Center>
          <Text>{item.description}</Text>
        </Center>
        <Space h="xl" />
        <Space h="md" />
      </Card.Section>

      {/* Received progress bar */}
      <Card.Section inheritPadding pb="xl">
        <Card.Section pl="xl" pr="xl">
          <Grid justify="space-between">
            <Text size="sm">
              Received {item.received_quantity} of {item.requested_quantity}
            </Text>
          </Grid>
          <Space h="sm" />
        </Card.Section>
        <Progress
          value={(item.received_quantity / item.requested_quantity) * 100}
        />
      </Card.Section>

      {/* Purchasing buttons */}
    </Card>
  );

  /*
  Card should be:
    - image
    - label
    - price
    - progress bar of requested/received
    - Link to purchase
    - Button for "I have purchased" -> Opens modal
      - Modal:
        - Ask name (for thank you cards!)
        - Quantity (to update progress)
  */
};

const fetchFromRegistryDatabase = async () => {
  // TODO: Connect to database for registry registry items
  return mockData;
};

const RegistryItems = async () => {
  return (
    <Box p="md">
      {(await fetchFromRegistryDatabase()).map((item) => (
        <Paper p="lg">
          <ItemCard key={item.label} {...item} />
        </Paper>
      ))}
    </Box>
  );
};

export default RegistryItems;

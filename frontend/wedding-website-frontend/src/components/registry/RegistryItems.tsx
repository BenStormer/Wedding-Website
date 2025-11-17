import './RegistryItems.css';
import { mockData } from './gifts'; // TODO: Remove this and use real DB

import { Box, Paper } from '@mantine/core';

type RegistryItem = {
  label: string;
  description: string;
  image?: string;
  alt?: string;
  requested_quantity: number;
  received_quantity: number;
  purchase_link: string;
};

const ItemCard = (item: RegistryItem) => {
  return <Paper key={item.label}>{item.description}</Paper>;
};

/* TODO: Connect to database for registry registry items
const fetchFromRegistryDatabase = () => {
  // TODO
};
*/

const RegistryItems = () => {
  return (
    <Box p="md">
      {mockData.map((item) => (
        <ItemCard key={item.label} {...item} />
      ))}
    </Box>
  );
};

export default RegistryItems;

import './Registry.css';
import RegistryItemsGrid from '../components/registry/RegistryItems';
import Menu from '../components/common/Menu';
import TopNav from '../components/common/TopNav';
import { Box, Text, Stack } from '@mantine/core';
import { IconGift } from '@tabler/icons-react';

const Registry = () => {
  return (
    <div className="body">
      <TopNav currentPage="Registry" theme="green" />
      <Box className="registry-page">
        <Box className="registry-header">
          <Stack gap="sm" align="center">
            <IconGift size={40} stroke={1.5} className="registry-header-icon" />
            <Text className="registry-header-title">Our Registry</Text>
            <Text className="registry-header-subtitle">
              Your presence at our wedding is the greatest gift of all. But if
              you'd like to get us something else, here are some ideas we'd
              love!
            </Text>
          </Stack>
        </Box>
        <Box className="registry-content">
          <RegistryItemsGrid />
        </Box>
      </Box>
      {Menu('Registry', 'green')}
    </div>
  );
};

export default Registry;

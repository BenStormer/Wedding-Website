import './VisitingNashville.css';

// Components
import NashvilleActivitiesTabs from '../components/visiting-nashville/NashvilleActivities';
import Menu from '../components/common/Menu';
import TopNav from '../components/common/TopNav';

// Mantine
import { Box, Text, Stack } from '@mantine/core';

const VisitingNashville = () => {
  return (
    <div className="body">
      <TopNav currentPage="Visiting Nashville" />
      <Box className="nashville-page">
        <Box className="nashville-header">
          <Stack gap="sm" align="center">
            <Text className="nashville-header-title">Visiting Nashville</Text>
            <Text className="nashville-header-subtitle">
              Make the most of your trip to Music City! Here are some of our
              favorite spots for lodging, sightseeing, and dining.
            </Text>
          </Stack>
        </Box>
        <Box className="nashville-content">
          <NashvilleActivitiesTabs />
        </Box>
      </Box>
      {Menu('Visiting Nashville')}
    </div>
  );
};

export default VisitingNashville;

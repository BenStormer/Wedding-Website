import './VisitingNashville.css';

// Components
import NashvilleActivitiesTabs from '../components/visiting-nashville/NashvilleActivities';
import Menu from '../components/common/Menu';

// Mantine
import { Box, Text } from '@mantine/core';

const VisitingNashville = () => {
  return (
    <div className="body">
      <Box className="nashville-page">
        <Box className="nashville-header">
          <Text className="nashville-header-title">Visiting Nashville</Text>
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

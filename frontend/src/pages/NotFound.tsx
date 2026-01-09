import { Link } from 'react-router-dom';
import { Stack, Text, Button, Box } from '@mantine/core';
import { IconHeartBroken, IconHome } from '@tabler/icons-react';
import Menu from '../components/common/Menu';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <Box className="not-found-content">
        <Stack align="center" gap="lg">
          <IconHeartBroken
            size={80}
            stroke={1.2}
            className="not-found-icon"
          />
          <Text className="not-found-title">Page Not Found</Text>
          <Text className="not-found-subtitle">
            Oops! Looks like this page wandered off before the wedding.
          </Text>
          <Button
            component={Link}
            to="/"
            size="lg"
            leftSection={<IconHome size={20} />}
            className="not-found-button"
          >
            Back to Home
          </Button>
        </Stack>
      </Box>
      {Menu('', 'brown')}
    </div>
  );
};

export default NotFound;

import './Timeline.css';
import { useState } from 'react';
import { Text, Box, Paper, UnstyledButton, Group } from '@mantine/core';
import {
  IconChevronLeft,
  IconChevronRight,
  IconClock,
} from '@tabler/icons-react';

export interface TimelineEvent {
  title: string;
  time: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const CustomTimeline = ({
  events,
}: TimelineProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const goToNext = () => {
    if (activeIndex < events.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const activeEvent = events[activeIndex];

  return (
    <Box className="timeline-wrapper">
      <Box className="timeline-nav-container" mb="xl">
        <div className="timeline-nav-pills">
          {events.map((event, index) => (
            <UnstyledButton
              key={event.title}
              className={`timeline-nav-pill ${
                index === activeIndex ? 'active' : ''
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <Text fw={600} fz={{ base: 'sm', sm: 'md' }}>
                {event.title}
              </Text>
              <Text fz={{ base: 'xs', sm: 'sm' }} opacity={0.7}>
                {event.time}
              </Text>
            </UnstyledButton>
          ))}
        </div>
      </Box>

      <Group gap="sm" align="center" wrap="nowrap">
        <UnstyledButton
          className="timeline-arrow"
          onClick={goToPrevious}
          disabled={activeIndex === 0}
          aria-label="Previous event"
        >
          <IconChevronLeft size={24} stroke={2} />
        </UnstyledButton>

        <Paper shadow="md" radius="md" className="timeline-card">
          <Box className="timeline-card-header">
            <Text fz={{ base: 'xl', sm: '1.5rem' }} fw={500} c="var(--secondary-green)">
              {activeEvent.title}
            </Text>
            <Group gap="xs" justify="center" mt="xs">
              <IconClock size={18} stroke={1.5} color="var(--secondary-green)" />
              <Text fz="md" c="var(--secondary-green)">
                {activeEvent.time}
              </Text>
            </Group>
          </Box>

          <Box p="lg" className="event-description">
            <Text className="timeline-description-text">
              {activeEvent.description}
            </Text>
          </Box>
        </Paper>

        <UnstyledButton
          className="timeline-arrow"
          onClick={goToNext}
          disabled={activeIndex === events.length - 1}
          aria-label="Next event"
        >
          <IconChevronRight size={24} stroke={2} />
        </UnstyledButton>
      </Group>
    </Box>
  );
};

export default CustomTimeline;

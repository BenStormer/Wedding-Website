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
  title?: string;
}

const CustomTimeline = ({
  events,
  title = 'Wedding Weekend Schedule',
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
      <Text
        ta="center"
        fz={{ base: 'xl', sm: '1.5rem' }}
        fw={400}
        c="black"
        mb="xl"
        style={{ letterSpacing: '0.03em' }}
      >
        {title}
      </Text>

      {/* Event Navigation Pills with connecting line */}
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
              <Text fw={600} fz={{ base: 'xs', sm: 'sm' }}>
                {event.title}
              </Text>
              <Text fz={{ base: '0.6rem', sm: 'xs' }} opacity={0.7}>
                {event.time}
              </Text>
            </UnstyledButton>
          ))}
        </div>
      </Box>

      {/* Event Detail Card */}
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
            <Text fz={{ base: 'lg', sm: 'xl' }} fw={500} c="white">
              {activeEvent.title}
            </Text>
            <Group gap="xs" justify="center" mt="xs">
              <IconClock size={16} stroke={1.5} color="rgba(255,255,255,0.8)" />
              <Text fz="sm" c="rgba(255,255,255,0.9)">
                {activeEvent.time}
              </Text>
            </Group>
          </Box>

          <Box p="lg" className="event-description">
            <Text size="sm" lh={1.7}>
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

import './Timeline.css';

import { Timeline, Text, Button, Space } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

type TimelineItemType = {
  title: string;
  time: string;
  details: string;
};

const TimelineItem = ({ item }: { item: TimelineItemType }) => {
  const [opened, toggleOpened] = useToggle();

  return (
    <Timeline.Item
      bullet={
        <Text size="xs" fw={700}>
          {item.time}
        </Text>
      }
    >
      {
        <Button
          styles={{ label: { fontWeight: 'bold' } }}
          size="compact-sm"
          variant="filled"
          color="var(--secondary-green)"
          c="black"
          onClick={() => toggleOpened()}
        >
          <Text fw={700} size="md">
            {item.title}
          </Text>
        </Button>
      }
      <Text size="sm" ml="lg">
        {opened ? item.details : ''}
      </Text>
      <Space h="md" />
    </Timeline.Item>
  );
};

const CustomTimeline = (timelineItems: Array<TimelineItemType>) => {
  return (
    <Timeline
      color="var(--primary-brown)"
      radius="xl"
      lineWidth={2}
      bulletSize={40}
    >
      {timelineItems.map((item) => {
        return <TimelineItem key={item.title} item={item} />;
      })}
    </Timeline>
  );
};

export default CustomTimeline;

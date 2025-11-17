import './FaqAccordion.css';
import { data } from './faqs';

import { Accordion, Box, Text, Center, Paper } from '@mantine/core';

type FaqEntryType = {
  question: string;
  answer: string;
};

const FaqAccordion = ({ category }: { category: string }) => {
  const items = data[category as keyof typeof data].map(
    (item: FaqEntryType) => (
      <Accordion.Item key={item.question} value={item.question}>
        <Accordion.Control icon="❓">{item.question}</Accordion.Control>
        <Accordion.Panel>{item.answer}</Accordion.Panel>
      </Accordion.Item>
    )
  );

  return (
    <Box p="md">
      <Paper radius="md" withBorder p="sm">
        <Center>
          <Text c="black" fw={700}>
            {category.charAt(0).toUpperCase() + category.slice(1)} Questions
          </Text>
        </Center>

        <Center>
          <Accordion radius="md">{items}</Accordion>
        </Center>
      </Paper>
    </Box>
  );
};

export default FaqAccordion;

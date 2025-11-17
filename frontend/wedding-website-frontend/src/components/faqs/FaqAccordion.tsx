import './FaqAccordion.css';
import { data } from './faqs';

import { Accordion, Box, Text, Center } from '@mantine/core';

type FaqEntryType = {
  question: string;
  answer: string;
};

const FaqAccordion = (category: string) => {
  const items = data[category as keyof typeof data].map(
    (item: FaqEntryType) => (
      <Accordion.Item key={item.question} value={item.question}>
        <Accordion.Control icon="❓">{item.question}</Accordion.Control>
        <Accordion.Panel>{item.answer}</Accordion.Panel>
      </Accordion.Item>
    )
  );

  return (
    <Box>
      <Center>
        <Text c="black" fw={700}>
          Questions about the {category}
        </Text>
      </Center>

      <Center>
        <Accordion variant="contained" radius="md">
          {items}
        </Accordion>
      </Center>
    </Box>
  );
};

export default FaqAccordion;

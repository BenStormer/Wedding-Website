import './FaqAccordion.css';
import {
  faqData,
  categoryLabels,
  categoryOrder,
} from './Faqs';
import type { FaqCategory } from './Faqs';

import { useState } from 'react';
import {
  Accordion,
  Box,
  Text,
  UnstyledButton,
  Stack,
} from '@mantine/core';
import {
  IconChevronDown,
  IconInfoCircle,
  IconMapPin,
  IconHeart,
  IconPlane,
  IconGift,
} from '@tabler/icons-react';

// Icon mapping for categories
const categoryIcons: Record<FaqCategory, typeof IconInfoCircle> = {
  general: IconInfoCircle,
  venue: IconMapPin,
  ceremony: IconHeart,
  accommodations: IconPlane,
  gifts: IconGift,
};

// Category tab button
interface CategoryTabProps {
  category: FaqCategory;
  isActive: boolean;
  onClick: () => void;
}

const CategoryTab = ({ category, isActive, onClick }: CategoryTabProps) => {
  const Icon = categoryIcons[category];

  return (
    <UnstyledButton
      onClick={onClick}
      className={`faq-category-tab ${isActive ? 'faq-category-tab-active' : ''}`}
    >
      <Icon size={18} stroke={1.5} />
      <span>{categoryLabels[category]}</span>
    </UnstyledButton>
  );
};

// Single FAQ item
interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
  return (
    <Accordion.Item value={question} className="faq-item">
      <Accordion.Control
        chevron={<IconChevronDown size={18} className="faq-chevron" />}
        className="faq-control"
      >
        <Text className="faq-question">{question}</Text>
      </Accordion.Control>
      <Accordion.Panel className="faq-panel">
        <Text className="faq-answer">{answer}</Text>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

// Main FAQ component
const FaqAccordionSection = () => {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('general');

  const currentFaqs = faqData[activeCategory];

  return (
    <Box className="faq-container">
      {/* Category Tabs */}
      <Box className="faq-tabs-container">
        <Box className="faq-tabs-grid">
          {categoryOrder.map((category) => (
            <CategoryTab
              key={category}
              category={category}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </Box>
      </Box>

      {/* FAQ Content */}
      <Box className="faq-content">
        <Stack gap={0}>
          <Accordion
            variant="separated"
            radius="md"
            className="faq-accordion"
            chevronPosition="right"
          >
            {currentFaqs.map((faq) => (
              <FaqItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </Accordion>
        </Stack>
      </Box>
    </Box>
  );
};

export default FaqAccordionSection;

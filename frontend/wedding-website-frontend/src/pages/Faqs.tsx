import './Faqs.css';

// Components
import FaqAccordionSection from '../components/faqs/FaqAccordion';
import Menu from '../components/common/Menu';
import TopNav from '../components/common/TopNav';

// Mantine
import { Box, Text, Stack } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';

const Faqs = () => {
  return (
    <div className="body">
      <TopNav currentPage="FAQs" />
      <Box className="faqs-page">
        <Box className="faqs-header">
          <Stack gap="sm" align="center">
            <IconQuestionMark
              size={40}
              stroke={1.5}
              className="faqs-header-icon"
            />
            <Text className="faqs-header-title">Frequently Asked Questions</Text>
            <Text className="faqs-header-subtitle">
              Have questions? We've got answers! If you don't find what you're
              looking for, feel free to reach out to us directly.
            </Text>
          </Stack>
        </Box>
        <Box className="faqs-content">
          <FaqAccordionSection />
        </Box>
      </Box>
      {Menu('Frequently Asked Questions')}
    </div>
  );
};

export default Faqs;

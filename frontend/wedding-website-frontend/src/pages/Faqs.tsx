import './Home.css';

// Components
import Menu from '../components/common/Menu';
import FaqAccordion from '../components/faqs/FaqAccordion';
import { Space, Text } from '@mantine/core';

const Faqs = () => {
  return (
    <div className="faqs-container">
      {FaqAccordion('venue')}
      <Space h="md" />
      {FaqAccordion('ceremony')}
      <Space h="md" />
    </div>
  );
};

const Registry = () => {
  return (
    <div className="body">
      <Faqs />
      {Menu('Registry')}
    </div>
  );
};

export default Registry;

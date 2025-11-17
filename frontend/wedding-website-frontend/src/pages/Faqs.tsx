import './Home.css';

// Components
import Menu from '../components/common/Menu';
import FaqAccordion from '../components/faqs/FaqAccordion';
import { Space } from '@mantine/core';

// Data
import { data } from '../components/faqs/faqs';

const Faqs = () => {
  return (
    <div className="faqs-container">
      {Object.keys(data).map((category) => (
        <div key={category}>
          <FaqAccordion category={category} />
          <Space h="md" />
        </div>
      ))}
    </div>
  );
};

const Registry = () => {
  return (
    <div className="body">
      <Faqs />
      {Menu('Frequently Asked Questions')}
    </div>
  );
};

export default Registry;

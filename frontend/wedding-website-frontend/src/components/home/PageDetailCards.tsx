import './PageDetailCards.css';

import { Card, Image, Text, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

type PageDetailCardType = {
  label: string;
  details: string;
  image: string;
  alt: string;
  link: string;
};

const PageDetailCard = ({ card }: { card: PageDetailCardType }) => {
  return (
    <div className="page-detail-card">
      <Card shadow="lg" padding="md" radius="md" withBorder>
        <Card.Section>
          <Image radius="xs" src={card.image} alt={card.alt} />
        </Card.Section>

        <Button
          color="var(--primary-green)"
          fullWidth
          mt="md"
          radius="md"
          component={Link}
          to={card.link}
        >
          {card.label}
        </Button>

        <Text size="sm" c="black" mt="md" mb="xs">
          {card.details}
        </Text>
      </Card>
    </div>
  );
};

const PageDetailCardContainer = (
  pageDetailCards: Array<PageDetailCardType>
) => {
  return (
    <div className="page-detail-container">
      {pageDetailCards.map((card) => {
        return <PageDetailCard key={card.label} card={card} />;
      })}
    </div>
  );
};

export default PageDetailCardContainer;

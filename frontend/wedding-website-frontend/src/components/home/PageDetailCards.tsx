import './PageDetailCards.css';

import { Card, Text, Button, SimpleGrid, Image } from '@mantine/core';
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
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="page-detail-card"
      style={{ textDecoration: 'none', height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Card.Section>
        <Image radius="xs" src={card.image} alt={card.alt} height={200} fit="cover" />
      </Card.Section>

      <Text size="lg" fw={500} c="dark.7" mb="sm" mt="md" className="page-detail-label">
        {card.label}
      </Text>

      <Text size="sm" fw={300} c="dark.6" mb="md" style={{ flex: 1 }}>
        {card.details}
      </Text>

      <Button
        variant="light"
        color="var(--primary-green)"
        fullWidth
        mt="auto"
        radius="md"
        component={Link}
        to={card.link}
        className="page-detail-button"
      >
        Learn More
      </Button>
    </Card>
  );
};

const PageDetailCardContainer = ({
  pageDetailCards,
}: {
  pageDetailCards: Array<PageDetailCardType>;
}) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" className="page-detail-container">
      {pageDetailCards.map((card) => {
        return <PageDetailCard key={card.label} card={card} />;
      })}
    </SimpleGrid>
  );
};

export default PageDetailCardContainer;

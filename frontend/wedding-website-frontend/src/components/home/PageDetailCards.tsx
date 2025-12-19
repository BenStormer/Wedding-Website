import './PageDetailCards.css';

import { Card, Text, SimpleGrid, Image } from '@mantine/core';
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
      component={Link}
      to={card.link}
      style={{
        textDecoration: 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Card.Section>
        <Image
          radius="xs"
          src={card.image}
          alt={card.alt}
          height={200}
          fit="cover"
        />
      </Card.Section>

      <Text
        size="lg"
        fw={500}
        c="dark.7"
        mb="sm"
        mt="md"
        className="page-detail-label"
      >
        {card.label}
      </Text>

      <Text size="sm" fw={300} c="dark.6" mb="md" style={{ flex: 1 }}>
        {card.details}
      </Text>

      <div className="page-detail-button-placeholder">Learn More</div>
    </Card>
  );
};

const PageDetailCardContainer = ({
  pageDetailCards,
}: {
  pageDetailCards: Array<PageDetailCardType>;
}) => {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2 }}
      spacing="lg"
      className="page-detail-container"
    >
      {pageDetailCards.map((card) => {
        return <PageDetailCard key={card.label} card={card} />;
      })}
    </SimpleGrid>
  );
};

export default PageDetailCardContainer;

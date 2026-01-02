import './PageDetailCards.css';

import { Card, Text, SimpleGrid, Image } from '@mantine/core';
import { Link } from 'react-router-dom';

interface PageDetailCardType {
  label: string;
  details: string;
  image: string;
  alt: string;
  link: string;
  imagePosition?: string; // e.g., "center", "top", "bottom", "left 50%", etc.
}

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
          style={
            card.imagePosition
              ? { objectPosition: card.imagePosition }
              : undefined
          }
        />
      </Card.Section>

      <Text
        className="page-detail-label"
        mb="sm"
        mt="md"
      >
        {card.label}
      </Text>

      <Text className="page-detail-text" style={{ flex: 1 }}>
        {card.details}
      </Text>
    </Card>
  );
};

const PageDetailCardContainer = ({
  pageDetailCards,
}: {
  pageDetailCards: PageDetailCardType[];
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

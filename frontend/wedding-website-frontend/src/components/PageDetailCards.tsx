import './PageDetailCards.css';

import { Card, Image } from '@mantine/core';

type PageDetailCardType = {
  label: string;
  details: string;
  image: string;
};

const PageDetailCard = ({ card }: { card: PageDetailCardType }) => {
  return (
    <div className="page-detail-card">
      <Card shadow="lg" padding="sm" radius="md" withBorder>
        <Image radius="md" src={card.image} />
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

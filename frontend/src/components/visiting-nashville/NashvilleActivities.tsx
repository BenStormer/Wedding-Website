import './NashvilleActivities.css';
import { data, tagLabels } from './Places';
import type { Place, PlaceTag } from './Places';

import {
  SimpleGrid,
  Card,
  Image,
  Text,
  Box,
  Group,
  Badge,
  Stack,
  UnstyledButton,
  Button,
} from '@mantine/core';
import { useState } from 'react';
import {
  IconMapPin,
  IconExternalLink,
  IconBed,
  IconMapSearch,
  IconToolsKitchen2,
  IconX,
} from '@tabler/icons-react';

// Fallback image URL for failed image loads
const PLACE_PLACEHOLDER =
  'https://placehold.co/800x600/f5f0ed/5e4838?text=Place';

// Cost display component
const CostDisplay = ({ cost }: { cost: number }) => {
  if (cost === 0) {
    return (
      <Text size="sm" c="var(--bold-brown)" fw={600}>
        Free
      </Text>
    );
  }

  return (
    <Group gap={2}>
      {Array.from({ length: cost }, (_, i) => (
        <Text key={i} size="sm" fw={600} c="#4a3a2e">
          $
        </Text>
      ))}
    </Group>
  );
};

// Individual place card
interface PlaceCardProps {
  place: Place;
  onTagClick: (tag: PlaceTag) => void;
  activeFilters: Set<PlaceTag>;
}

const PlaceCard = ({ place, onTagClick, activeFilters }: PlaceCardProps) => {
  return (
    <Card className="place-card" shadow="sm" radius="md" withBorder>
      <Card.Section className="place-card-image-section">
        <Image
          src={place.image}
          alt={place.alt}
          height={180}
          fallbackSrc={PLACE_PLACEHOLDER}
        />
        <Box className="place-card-cost-badge">
          <CostDisplay cost={place.cost} />
        </Box>
        {place.distanceFromVenue && (
          <Box className="place-card-distance-badge">
            <Text size="sm" c="var(--bold-brown)" fw={600}>
              {place.distanceFromVenue} from venue
            </Text>
          </Box>
        )}
      </Card.Section>

      <Stack gap="sm" className="place-card-content">
        <Text className="place-card-title">{place.label}</Text>

        <Group gap={6} wrap="wrap">
          {place.tags.map((tag) => {
            const isActive = activeFilters.has(tag);
            return (
              <Badge
                key={tag}
                size="xs"
                variant="light"
                className={`place-tag place-tag-clickable ${
                  isActive ? 'place-tag-active' : ''
                }`}
                onClick={() => onTagClick(tag)}
              >
                {tagLabels[tag]}
              </Badge>
            );
          })}
        </Group>

        <Text size="md" c="var(--bold-brown)" className="place-card-details">
          {place.details}
        </Text>

        <Text size="md" c="var(--bold-brown)" className="place-card-tip">
          {place.tip && (
            <Text size="sm" className="place-card-tip">
              Tip: {place.tip}
            </Text>
          )}
        </Text>

        <Box className="place-card-bottom">
          <Group grow gap="sm" className="place-card-links">
            <Button
              component="a"
              href={place.directionsLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
              color="var(--primary-brown)"
              leftSection={<IconMapPin size={15} />}
              className="place-button"
            >
              Directions
            </Button>
            <Button
              component="a"
              href={place.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
              color="var(--primary-brown)"
              leftSection={<IconExternalLink size={15} />}
              className="place-button"
            >
              Website
            </Button>
          </Group>
        </Box>
      </Stack>
    </Card>
  );
};

// Active filters display
interface ActiveFiltersProps {
  filters: Set<PlaceTag>;
  onRemove: (tag: PlaceTag) => void;
  onClearAll: () => void;
}

const ActiveFilters = ({
  filters,
  onRemove,
  onClearAll,
}: ActiveFiltersProps) => {
  const filterArray = Array.from(filters);

  return (
    <Box className="active-filter-container">
      <Group gap="xs" justify="center" wrap="wrap">
        <Text size="sm" c="var(--bold-brown)">
          Filtering by:
        </Text>
        {filterArray.map((tag) => (
          <Badge
            key={tag}
            size="lg"
            variant="filled"
            className="active-filter-badge"
            rightSection={
              <UnstyledButton
                onClick={() => onRemove(tag)}
                className="filter-clear-button"
              >
                <IconX size={14} />
              </UnstyledButton>
            }
          >
            {tagLabels[tag]}
          </Badge>
        ))}
        {filterArray.length > 1 && (
          <UnstyledButton onClick={onClearAll} className="clear-all-button">
            Clear all
          </UnstyledButton>
        )}
      </Group>
    </Box>
  );
};

// Grid of place cards
interface PlaceCardGridProps {
  places: Place[];
  onTagClick: (tag: PlaceTag) => void;
  activeFilters: Set<PlaceTag>;
}

const PlaceCardGrid = ({
  places,
  onTagClick,
  activeFilters,
}: PlaceCardGridProps) => {
  return (
    <Box className="place-grid-container">
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing="lg"
        verticalSpacing="lg"
      >
        {places.map((place) => (
          <PlaceCard
            key={place.label}
            place={place}
            onTagClick={onTagClick}
            activeFilters={activeFilters}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

// Tab button component
type TabValue = 'places-to-stay' | 'places-to-see' | 'places-to-eat';

const tabConfig: {
  value: TabValue;
  label: string;
  icon: typeof IconBed;
}[] = [
  { value: 'places-to-stay', label: 'Places to Stay', icon: IconBed },
  { value: 'places-to-see', label: 'Places to See', icon: IconMapSearch },
  { value: 'places-to-eat', label: 'Places to Eat', icon: IconToolsKitchen2 },
];

const NashvilleActivitiesTabs = () => {
  const [activeTab, setActiveTab] = useState<TabValue>('places-to-stay');
  const [activeFilters, setActiveFilters] = useState<Set<PlaceTag>>(new Set());

  const handleTagClick = (tag: PlaceTag) => {
    setActiveFilters((prev) => {
      const newFilters = new Set(prev);
      if (newFilters.has(tag)) {
        newFilters.delete(tag);
      } else {
        newFilters.add(tag);
      }
      return newFilters;
    });
  };

  const removeFilter = (tag: PlaceTag) => {
    setActiveFilters((prev) => {
      const newFilters = new Set(prev);
      newFilters.delete(tag);
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters(new Set());
  };

  const handleTabChange = (tab: TabValue) => {
    setActiveTab(tab);
    setActiveFilters(new Set()); // Clear filters when changing tabs
  };

  // Filter places - must have ALL selected tags (AND logic)
  const filteredPlaces =
    activeFilters.size > 0
      ? data[activeTab].filter((place) =>
          Array.from(activeFilters).every((tag) => place.tags.includes(tag))
        )
      : data[activeTab];

  return (
    <Box className="nashville-activities-container">
      {/* Tab Navigation */}
      <Box className="tab-navigation">
        <Group gap="sm" justify="center" wrap="wrap">
          {tabConfig.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.value;
            return (
              <UnstyledButton
                key={tab.value}
                onClick={() => handleTabChange(tab.value)}
                className={`tab-button ${isActive ? 'tab-button-active' : ''}`}
              >
                <Icon size={18} stroke={1.5} />
                <span>{tab.label}</span>
              </UnstyledButton>
            );
          })}
        </Group>
      </Box>

      {/* Places to Stay Note */}
      {activeTab === 'places-to-stay' && (
        <Text
          className="places-to-stay-note"
          size="sm"
          c="var(--bold-brown)"
          ta="center"
        >
          We haven't stayed at these spots ourselves, but chose them based on
          reviews and proximity to the wedding venue. Tennessee is beautiful and
          there are also many great Airbnb options in the area! You probably
          can't go wrong with any lodging option you find.
        </Text>
      )}

      {/* Active Filters Display */}
      {activeFilters.size > 0 && (
        <ActiveFilters
          filters={activeFilters}
          onRemove={removeFilter}
          onClearAll={clearAllFilters}
        />
      )}

      {/* Content */}
      <Box className="tab-content">
        {filteredPlaces.length > 0 ? (
          <PlaceCardGrid
            places={filteredPlaces}
            onTagClick={handleTagClick}
            activeFilters={activeFilters}
          />
        ) : (
          <Box className="no-results">
            <Text c="var(--bold-brown)" ta="center">
              No places found with these filters.
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NashvilleActivitiesTabs;

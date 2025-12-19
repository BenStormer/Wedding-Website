import './NashvilleActivites.css';
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
  Anchor,
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

// Tag color mapping for visual variety
const getTagColor = (tag: PlaceTag): string => {
  const colors: Record<PlaceTag, string> = {
    downtown: '#5e4838',
    outdoors: '#566f4d',
    drinks: '#8b5a2b',
    'live-music': '#6b4c7a',
    history: '#4a6572',
    'family-friendly': '#5e4838',
    parking: '#566f4d',
    walkable: '#6b8e6b',
    brunch: '#c4956a',
    upscale: '#5e4838',
    casual: '#7a8b6e',
    'local-favorite': '#b4846c',
  };
  return colors[tag] || '#5e4838';
};

// Cost display component
const CostDisplay = ({ cost }: { cost: number }) => {
  if (cost === 0) {
    return (
      <Text size="sm" c="var(--primary-green)" fw={600}>
        Free
      </Text>
    );
  }

  return (
    <Group gap={2}>
      {[1, 2, 3, 4].map((i) => (
        <Text
          key={i}
          size="sm"
          fw={600}
          c={i <= cost ? 'var(--primary-green)' : 'gray.4'}
        >
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
          fallbackSrc="https://picsum.photos/800/600"
        />
        <Box className="place-card-cost-badge">
          <CostDisplay cost={place.cost} />
        </Box>
      </Card.Section>

      <Stack gap="sm" className="place-card-content">
        <Text className="place-card-title">{place.label}</Text>

        <Group gap={6} wrap="wrap">
          {place.tags.slice(0, 3).map((tag) => {
            const isActive = activeFilters.has(tag);
            return (
              <Badge
                key={tag}
                size="xs"
                variant="light"
                className={`place-tag place-tag-clickable ${isActive ? 'place-tag-active' : ''}`}
                style={{
                  backgroundColor: isActive
                    ? getTagColor(tag)
                    : `${getTagColor(tag)}15`,
                  color: isActive ? 'white' : getTagColor(tag),
                  border: `1px solid ${getTagColor(tag)}${isActive ? '' : '30'}`,
                }}
                onClick={() => onTagClick(tag)}
              >
                {tagLabels[tag]}
              </Badge>
            );
          })}
        </Group>

        <Text size="md" c="dark.5" className="place-card-details">
          {place.details}
        </Text>

        <Group justify="space-between" className="place-card-links">
          <Anchor
            href={place.directionsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="place-link"
          >
            <IconMapPin size={18} />
            <span>Directions</span>
          </Anchor>
          <Anchor
            href={place.websiteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="place-link"
          >
            <IconExternalLink size={18} />
            <span>Website</span>
          </Anchor>
        </Group>
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

const ActiveFilters = ({ filters, onRemove, onClearAll }: ActiveFiltersProps) => {
  const filterArray = Array.from(filters);

  return (
    <Box className="active-filter-container">
      <Group gap="xs" justify="center" wrap="wrap">
        <Text size="sm" c="dark.5">
          Filtering by:
        </Text>
        {filterArray.map((tag) => (
          <Badge
            key={tag}
            size="lg"
            variant="filled"
            className="active-filter-badge"
            style={{
              backgroundColor: getTagColor(tag),
            }}
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
            <Text c="dark.4" ta="center">
              No places found with these filters.
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NashvilleActivitiesTabs;

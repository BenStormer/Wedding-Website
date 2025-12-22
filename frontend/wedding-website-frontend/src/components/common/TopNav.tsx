import './TopNav.css';

import { Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

interface NavItem {
  label: string;
  shortLabel?: string;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Details', path: '/details' },
  { label: 'Visiting Nashville', shortLabel: 'Nashville', path: '/visiting-nashville' },
  { label: 'Registry', path: '/registry' },
  { label: 'FAQs', path: '/faqs' },
];

interface TopNavProps {
  currentPage: string;
}

const TopNav = ({ currentPage }: TopNavProps) => {
  return (
    <nav className="top-nav">
      <Group gap="xs" justify="flex-start" wrap="wrap" className="top-nav-links">
        {navItems.map((item, index) => {
          const isActive = item.label === currentPage;
          const isLast = index === navItems.length - 1;

          return (
            <Group key={item.label} gap="xs" wrap="nowrap">
              {isActive ? (
                <Text className="top-nav-link top-nav-link-active">
                  <span className="top-nav-full-label">{item.label}</span>
                  {item.shortLabel && (
                    <span className="top-nav-short-label">{item.shortLabel}</span>
                  )}
                </Text>
              ) : (
                <Text
                  component={Link}
                  to={item.path}
                  className="top-nav-link"
                >
                  <span className="top-nav-full-label">{item.label}</span>
                  {item.shortLabel && (
                    <span className="top-nav-short-label">{item.shortLabel}</span>
                  )}
                </Text>
              )}
              {!isLast && <Text className="top-nav-separator">/</Text>}
            </Group>
          );
        })}
      </Group>
    </nav>
  );
};

export default TopNav;

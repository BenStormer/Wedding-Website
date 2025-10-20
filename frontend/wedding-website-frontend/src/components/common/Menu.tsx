import './Menu.css';

import { Flex, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

const MenuLink = (label: string, link: string) => {
  return (
    <Text mt="xs" mb="xs" fw={700} component={Link} to={link}>
      {label}
    </Text>
  );
};

const Menu = () => {
  return (
    <div className="menu-section-container">
      <Flex direction="column">
        {MenuLink('Details', '/details')}
        {MenuLink('Visiting Nashville', '/visting-nashville')}
        {MenuLink('Registry', '/registry')}
        {MenuLink('Frequently Asked Questions', '/faqs')}
      </Flex>
    </div>
  );
};

export default Menu;

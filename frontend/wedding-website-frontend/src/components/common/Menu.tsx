import './Menu.css';

import { Flex, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

const MenuLink = (label: string, link: string) => {
  return (
    <Text key={label} mt="xs" mb="xs" fw={700} component={Link} to={link}>
      {label}
    </Text>
  );
};

const Menu = (currentPage: string) => {
  const menuMappings = {
    Home: '/',
    Details: '/details',
    'Visiting Nashville': '/visiting-nashville',
    Registry: '/registry',
    'Frequently Asked Questions': '/faqs',
  };

  const linksToRender = Object.fromEntries(
    Object.entries(menuMappings).filter(([key, _value]) => {
      return key !== currentPage;
    })
  );

  return (
    <div className="menu-section-container">
      <Flex direction="column">
        {Object.entries(linksToRender).map(([label, link]) =>
          MenuLink(label, link)
        )}
      </Flex>
    </div>
  );
};

export default Menu;

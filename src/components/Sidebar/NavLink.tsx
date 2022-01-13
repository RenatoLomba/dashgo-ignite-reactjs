import { FC } from 'react';
import { IconType } from 'react-icons';
import { Icon as ChakraIcon, Link, LinkProps, Text } from '@chakra-ui/react';

import { ActiveLink } from '../ActiveLink';

interface NavLinkProps extends LinkProps {
  name: string;
  href: string;
  icon: IconType;
}

const NavLink: FC<NavLinkProps> = ({ icon: Icon, name, href, ...rest }) => {
  return (
    <ActiveLink href={href} passHref>
      <Link display="flex" align="center" {...rest}>
        <ChakraIcon as={Icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {name}
        </Text>
      </Link>
    </ActiveLink>
  );
};

export { NavLink };

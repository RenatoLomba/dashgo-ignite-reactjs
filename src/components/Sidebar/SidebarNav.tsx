import { Stack } from '@chakra-ui/react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri';

import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink href="/dashboard" icon={RiDashboardLine} name="Dashboard" />
        <NavLink href="/users" icon={RiContactsLine} name="Usuários" />
      </NavSection>
      <NavSection title="AUTOMAÇÃO">
        <NavLink
          href="/users/create"
          icon={RiInputMethodLine}
          name="Formulários"
        />
        <NavLink href="/automation" icon={RiGitMergeLine} name="Automação" />
      </NavSection>
    </Stack>
  );
}

export { SidebarNav };

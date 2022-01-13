import { useContext } from 'react';
import { SidebarDrawerContext } from '../contexts/SidebarDrawerContext';

function useSidebarDrawer() {
  return useContext(SidebarDrawerContext);
}

export { useSidebarDrawer };

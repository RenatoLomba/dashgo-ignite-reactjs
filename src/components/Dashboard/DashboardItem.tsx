import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

interface DashboardItemProps {
  title?: string;
}

const DashboardItem: FC<DashboardItemProps> = ({ title, children }) => {
  return (
    <Box p={['4', '8']} bg="gray.800" borderRadius={8} pb="4">
      {!!title && <Text>{title}</Text>}
      {children}
    </Box>
  );
};

export { DashboardItem };

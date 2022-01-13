import { FC } from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';

interface NavSectionProps {
  title: string;
}

const NavSection: FC<NavSectionProps> = ({ title, children }) => {
  return (
    <Box>
      <Text fontWeight="bold" color="gray.400" fontSize="small">
        {title}
      </Text>
      <Stack spacing="4" mt="8" align="stretch">
        {children}
      </Stack>
    </Box>
  );
};

export { NavSection };

import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

interface ProfileProps {
  showProfileInfo?: boolean;
}

const Profile: FC<ProfileProps> = ({ showProfileInfo = true }) => {
  return (
    <Flex align="center">
      {showProfileInfo && (
        <Box mr="4" textAlign="right">
          <Text>Renato Lomba</Text>
          <Text color="gray.300" fontSize="small">
            rntlomba@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Renato Lomba"
        src="https://github.com/RenatoLomba.png"
      />
    </Flex>
  );
};

export { Profile };

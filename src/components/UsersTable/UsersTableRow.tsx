import { FC } from 'react';
import {
  Box,
  Checkbox,
  Td,
  Tr,
  Text,
  Button,
  Icon,
  Link,
} from '@chakra-ui/react';
import { RiPencilLine } from 'react-icons/ri';

import { queryClient } from '../../services/react-query/queryClient';
import { api } from '../../services/api';

interface UsersTableRowProps {
  isWideVersion?: boolean;
  user: User;
}

interface User {
  createdAtFormatted: string;
  created_at: string;
  email: string;
  id: string;
  name: string;
}

interface ResponseData {
  user: User;
}

const UsersTableRow: FC<UsersTableRowProps> = ({
  isWideVersion = true,
  user: { createdAtFormatted, email, id, name },
}) => {
  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const { data } = await api.get<ResponseData>(`users/${userId}`);
        return data.user;
      },
      { staleTime: 1000 * 60 * 10 },
    );
  }

  return (
    <Tr>
      <Td px={['4', '4', '6']}>
        <Checkbox colorScheme="pink" />
      </Td>
      <Td>
        <Box>
          <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(id)}>
            <Text fontWeight="bold" display="inline">
              {name}
            </Text>
          </Link>

          <Text fontSize="small" color="gray.300">
            {email}
          </Text>
        </Box>
      </Td>
      {!!isWideVersion && <Td>{createdAtFormatted}</Td>}
      <Td>
        {isWideVersion ? (
          <Button
            as="a"
            size="sm"
            fontSize="small"
            colorScheme="purple"
            leftIcon={<Icon as={RiPencilLine} />}
          >
            Editar
          </Button>
        ) : (
          <Button as="a" size="sm" fontSize="small" colorScheme="purple">
            <Icon as={RiPencilLine} />
          </Button>
        )}
      </Td>
    </Tr>
  );
};

export { UsersTableRow };

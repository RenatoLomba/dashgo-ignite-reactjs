import { Checkbox, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { UsersTableRow } from './UsersTableRow';

interface User {
  id: string;
  name: string;
  email: string;
  createdAtFormatted: string;
  created_at: string;
}

interface UsersTableProps {
  isWideVersion?: boolean;
  users?: User[];
}

const UsersTable: FC<UsersTableProps> = ({ users, isWideVersion = true }) => {
  return (
    <Table colorScheme="whiteAlpha">
      <Thead>
        <Tr>
          <Th px={['4', '4', '6']} color="gray.300" w="8">
            <Checkbox colorScheme="pink" />
          </Th>
          <Th>Usuário</Th>
          {isWideVersion && <Th>Data de cadastro</Th>}
          <Th w="8"></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users?.map((user) => (
          <UsersTableRow
            key={user.id}
            isWideVersion={isWideVersion}
            user={user}
          />
        ))}
      </Tbody>
    </Table>
  );
};

export { UsersTable };

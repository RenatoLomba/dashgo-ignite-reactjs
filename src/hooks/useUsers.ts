import { useQuery } from 'react-query';
import { api } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  createdAtFormatted: string;
}

interface ResponseData {
  users: User[];
}

interface GetUsersResult {
  totalCount: number;
  users: User[];
}

const getUsers = async (page: number): Promise<GetUsersResult> => {
  const { data, headers } = await api.get<ResponseData>('users', {
    params: { page },
  });

  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map((user) => ({
    ...user,
    createdAtFormatted: new Date(user.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return { users, totalCount };
};

function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10,
  });
}

export { useUsers, getUsers };

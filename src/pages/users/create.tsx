import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

import { Input } from '../../components/Form/Input';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';
import { queryClient } from '../../services/react-query/queryClient';

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome completo é obrigatório'),
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(4, 'Senha deve ter no mínimo 4 caracteres')
    .max(8, 'Senha deve ter no máximo 8 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
});

function CreateUser() {
  const router = useRouter();

  const { mutateAsync: createUser } = useMutation(
    async (user: CreateUserFormData) => {
      const { data } = await api.post('users', {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      return data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users', 1]);
      },
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(createUserFormSchema) });

  const createUserFormSubmit: SubmitHandler<CreateUserFormData> = async (
    data,
  ) => {
    await createUser(data);
    router.push('/users');
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p={['6', '8']}>
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <Box as="form" w="100%" onSubmit={handleSubmit(createUserFormSubmit)}>
            <VStack spacing={['6', '8']}>
              <SimpleGrid minChildWidth={240} gap={['4', '8']} w="100%">
                <Input
                  {...register('name')}
                  error={errors.name}
                  name="name"
                  label="Nome completo"
                />
                <Input
                  {...register('email')}
                  error={errors.email}
                  name="email"
                  label="E-mail"
                  type="email"
                />
              </SimpleGrid>
              <SimpleGrid minChildWidth={240} gap={['4', '8']} w="100%">
                <Input
                  {...register('password')}
                  error={errors.password}
                  name="password"
                  label="Senha"
                  type="password"
                />
                <Input
                  {...register('password_confirmation')}
                  error={errors.password_confirmation}
                  name="password_confirmation"
                  label="Confirmar senha"
                  type="password"
                />
              </SimpleGrid>
            </VStack>

            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <NextLink href="/users" passHref>
                  <Button as="a" colorScheme="whiteAlpha" type="button">
                    Cancelar
                  </Button>
                </NextLink>
                <Button
                  colorScheme="pink"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default CreateUser;

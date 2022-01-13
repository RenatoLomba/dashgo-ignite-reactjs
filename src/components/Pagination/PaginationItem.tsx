import { Button } from '@chakra-ui/react';
import { FC } from 'react';

interface PaginationItemProps {
  isCurrent?: boolean;
  pageNumber: number | string;
  onPageChange: (page: number) => void;
}

const PaginationItem: FC<PaginationItemProps> = ({
  isCurrent = false,
  pageNumber,
  onPageChange,
}) => {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        w="4"
        colorScheme="pink"
        disabled
        _disabled={{
          bgColor: 'pink.500',
          cursor: 'default',
        }}
      >
        {pageNumber}
      </Button>
    );
  } else {
    return (
      <Button
        size="sm"
        fontSize="xs"
        w="4"
        bgColor="gray.700"
        _hover={{
          bgColor: 'gray.500',
        }}
        onClick={() => onPageChange(Number(pageNumber))}
      >
        {pageNumber}
      </Button>
    );
  }
};

export { PaginationItem };

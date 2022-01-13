import { cloneElement, FC, ReactElement } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
}

const ActiveLink: FC<ActiveLinkProps> = ({ children, ...rest }) => {
  const { asPath } = useRouter();
  const isActive = asPath === rest.href || asPath === rest.as;

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50',
      })}
    </Link>
  );
};

export { ActiveLink };

import React from 'react';
import Link from 'next/link';
import { isServer } from '../utils/isServer';
import { useApolloClient } from '@apollo/client';
import BalenChasma from '../assests/Asset 2.png';
import Image from 'next/image';
import LinkButton from './buttons/LinkButton';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import StandardButton from './buttons/StandardButton';
import LinkButtonTwo from './buttons/LinkButtonTwo';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  const onLogout = async () => {
    await logout({});
    await apolloClient.resetStore();
    router.push('/');
  };

  let buttons: any = null;

  if (loading) {
    buttons = <div>Loading</div>;
  } else if (!data?.me) {
    buttons = (
      <div className="flex">
        <div className="mr-2">
          <LinkButton href="/login">Login</LinkButton>
        </div>

        <LinkButtonTwo href="/register">Register</LinkButtonTwo>
      </div>
    );
  } else {
    buttons = (
      <div>
        <div className="flex">
          <div className="mr-2">
            <LinkButton href="/create-complain">Create Complain</LinkButton>
          </div>
          <div>
            <StandardButton onClick={onLogout}>Logout</StandardButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex my-6 justify-between items-center">
      <Link href="/">
        <div className="flex items-center">
          <div className="scale-75">
            <Image src={BalenChasma} alt="Logo" />
          </div>
          <div className="">
            <h1 className="ml-3 text-2xl">
              Infrastructure
              <br />
              Ambulance
            </h1>
          </div>
        </div>
      </Link>
      {buttons}
    </div>
  );
};

export default Navbar;

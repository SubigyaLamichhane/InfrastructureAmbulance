import React from 'react';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { isServer } from '../utils/isServer';
import { useApolloClient } from '@apollo/client';
import BalenChasma from '../assests/Asset 2.png';
import Image from 'next/image';
import LinkButton from './buttons/LinkButton';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <div className="flex my-6 justify-between items-center">
      <div className="flex items-center">
        <div className="">
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
      <div className="">
        <LinkButton href="/login">Login</LinkButton>
      </div>
    </div>
  );
};

export default Navbar;

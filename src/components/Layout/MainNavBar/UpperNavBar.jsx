import { ButtonGroup, Flex, IconButton } from '@chakra-ui/react';
import React from 'react';
import Logo from './Logo';
import { BsChatFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import SearchBar from './SearchBar';

export default function UpperNavBar() {
  return (
    <div>
      <Flex
        basis="100%"
        bgColor="orange.300"
        justify="space-between"
        align="center"
      >
        <Logo />

        <SearchBar />

        <ButtonGroup spacing="0.75em" marginRight="0.75em">
          <IconButton
            aria-label="Chat"
            borderRadius="50%"
            icon={<BsChatFill />}
          />
          <IconButton
            aria-label="Profile"
            borderRadius="50%"
            icon={<CgProfile />}
          />
        </ButtonGroup>
      </Flex>
    </div>
  );
}

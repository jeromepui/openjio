import React from 'react';
import { Button, ButtonGroup, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function LowerNavBar() {
  return (
    <Flex bgColor="#0FA3B1" justify="flex-start">
      <ButtonGroup variant="ghost" color="black" ml="2" spacing="6">
        <Link to="/">
          <Button>Home</Button>
        </Link>

        <Link to="/dashboard">
          <Button>Dashboard</Button>
        </Link>

        <Link to="/community">
          <Button>Community</Button>
        </Link>
      </ButtonGroup>
    </Flex>
  );
}

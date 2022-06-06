import { Button, ButtonGroup, Flex } from '@chakra-ui/react';
import { MdDashboard, MdHome } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function BottomNavBar() {
  return (
    <Flex bg="#02CECB" justify="flex-start">
      <ButtonGroup color="black" spacing="6" px="2" variant="ghost">
        <Link to="/">
          <Button
            _hover={{
              background: '#B4FFFF',
            }}
            leftIcon={<MdHome />}
          >
            Home
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button
            _hover={{
              background: '#B4FFFF',
            }}
            leftIcon={<MdDashboard />}
          >
            Dashboard
          </Button>
        </Link>
      </ButtonGroup>
    </Flex>
  );
}

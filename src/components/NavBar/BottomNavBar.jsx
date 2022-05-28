import { Button, ButtonGroup, Flex } from '@chakra-ui/react';
import { MdDashboard, MdHome, MdPeople } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function BottomNavBar() {
  return (
    <Flex bgColor="teal.400" justify="flex-start">
      <ButtonGroup color="black" spacing="6" px="2" variant="ghost">
        <Link to="/">
          <Button leftIcon={<MdHome />}>Home</Button>
        </Link>
        <Link to="/dashboard">
          <Button leftIcon={<MdDashboard />}>Dashboard</Button>
        </Link>
        <Link to="/community">
          <Button leftIcon={<MdPeople />}>Community</Button>
        </Link>
      </ButtonGroup>
    </Flex>
  );
}

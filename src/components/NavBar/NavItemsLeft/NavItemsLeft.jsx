import { Button, HStack } from '@chakra-ui/react';
import { MdChat, MdDashboard, MdHome } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function NavItemsLeft() {
  const { pathname } = useLocation();

  return (
    <HStack spacing="8">
      <Link to="/">
        <Button
          background={pathname === '/' && '#FED811'}
          color="black"
          _hover={{
            background: '#FED811',
          }}
          leftIcon={<MdHome />}
          variant="ghost"
        >
          Home
        </Button>
      </Link>
      <Link to="/dashboard">
        <Button
          background={pathname === '/dashboard' && '#FED811'}
          color="black"
          _hover={{
            background: '#FED811',
          }}
          leftIcon={<MdDashboard />}
          variant="ghost"
        >
          Dashboard
        </Button>
      </Link>
      <Link to="/chat">
        <Button
          background={pathname === '/chat' && '#FED811'}
          color="black"
          _hover={{
            background: '#FED811',
          }}
          leftIcon={<MdChat />}
          variant="ghost"
        >
         Chat
        </Button>
      </Link>
      <SearchBar />
    </HStack>
  );
}

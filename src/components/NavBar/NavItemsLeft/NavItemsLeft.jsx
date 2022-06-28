import { Button, HStack } from '@chakra-ui/react';
import { MdDashboard, MdHome } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function NavItemsLeft() {
  const { pathname } = useLocation();

  return (
    <HStack spacing="8">
      <Link to="/">
        <Button
          background={pathname === '/' && '#B4FFFF'}
          color="black"
          _hover={{
            background: '#B4FFFF',
          }}
          leftIcon={<MdHome />}
          variant="ghost"
        >
          Home
        </Button>
      </Link>
      <Link to="/dashboard">
        <Button
          background={pathname === '/dashboard' && '#B4FFFF'}
          color="black"
          _hover={{
            background: '#B4FFFF',
          }}
          leftIcon={<MdDashboard />}
          variant="ghost"
        >
          Dashboard
        </Button>
      </Link>
      <SearchBar />
    </HStack>
  );
}

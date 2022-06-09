import { Box, Button, ButtonGroup, Flex, HStack } from '@chakra-ui/react';
import { MdAdd, MdDashboard, MdHome } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import SearchBar from './SearchBar';
import ChatButton from './ChatButton';
import ProfileButton from './ProfileButton';

export default function TopNavBar() {
  return (
    <Box w="100vw">
      <Flex align="center" bgColor="#FED811" justify="space-between">
        <Flex align="center">
          <Logo />
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
        <SearchBar />

        <HStack px="4" py="2" spacing="4">
          <Link to="/add-listing">
            <Button
              bg="#B4FFFF"
              color="black"
              _hover={{
                background: '#B4FFFF',
              }}
              leftIcon={<MdAdd />}
            >
              Add Listing
            </Button>
          </Link>
          <ChatButton />
          <ProfileButton />
        </HStack>
      </Flex>
    </Box>
  );
}
